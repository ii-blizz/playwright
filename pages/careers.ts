import { Locator, Page, expect } from "@playwright/test";
import { JobLocations } from "../fixtures/part-1/data/jobLocations";
import fs from "fs";

export class CareersPage {
    readonly page: Page;
    readonly careersPageLocator: Locator;
    readonly allLocationsTab: Locator;
    readonly bosniaTab: Locator;
    readonly macedoniaTab: Locator;
    readonly serbiaTab: Locator;
    readonly usaTab: Locator;
    readonly allLocationJobs: string;

    constructor(page: Page) {
        this.page = page;
        this.careersPageLocator = page.locator(".currentOpenings--title");
        this.allLocationsTab = page.locator('//*[span="All Locations"]');
        this.allLocationJobs =
            '//*[@class="currentOpenings--jobs"]/li[not(contains(@class, "hidden"))]';
    }

    private locationTabLocator = async (country: JobLocations) => {
        return this.page.locator(`//*[span="${country}"]`);
    };

    private assertElementIsActive = async (locator: Locator) => {
        return expect(locator).toHaveAttribute("class", "is-active");
    };

    async assertPage() {
        await this.careersPageLocator.waitFor();
    }

    async assertTotalOpenPositions() {
        // Count total open positions and get them per location
        await this.assertElementIsActive(this.allLocationsTab);
        await this.page.waitForSelector(this.allLocationJobs);
        const allLocationJobsCount = await this.page
            .locator(this.allLocationJobs)
            .count();
        // Go to each location tab and count total open positions and aggregate them
        let aggregatedCountPerSingleLocation = 0;
        for (const location of Object.values(JobLocations)) {
            await (await this.locationTabLocator(location)).click();
            await this.assertElementIsActive(
                await this.locationTabLocator(location)
            );
            await this.page.waitForSelector(this.allLocationJobs);
            const locationJobsCount = await this.page
                .locator(this.allLocationJobs)
                .count();
            aggregatedCountPerSingleLocation += locationJobsCount;
            // console.log(`Total ${location} Jobs: ${locationJobsCount}`);
        }
        // assert count of allPositions tab against aggregated count of respective location openings
        expect(allLocationJobsCount).toEqual(aggregatedCountPerSingleLocation);
        // console.log(
        //     `Total AggregatedPositions: ${aggregatedCountPerSingleLocation}`
        // );
        // console.log(`Total AllPositions: ${allLocationJobsCount}`);
    }

    async extractOpenPositionsInTextFile() {
        await this.page.waitForSelector(this.allLocationJobs);
        const positions = await this.page.locator(this.allLocationJobs).all();
        const filePath = "test-exports/openPositions.txt";
        fs.writeFileSync(filePath, "", { flag: "w" });
        for (const pos of positions) {
            const positionElement = await pos.locator(
                "//*[@class='currentOpenings--job-title']"
            );
            await positionElement.waitFor();
            let position = await positionElement.innerText();
            const locationElement = await pos.locator(
                "//*[@class='currentOpenings--job-locationWrapper-name']"
            );
            await locationElement.waitFor();
            let location = await locationElement.innerText();
            const logger = fs.createWriteStream(filePath, {
                flags: "a",
            });
            logger.write(`${position}, ${location}\n`, () => {
                console.log(`\n ${position}, ${location}\n`);
            });
        }
    }
}
