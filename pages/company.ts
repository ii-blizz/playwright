import { Page, expect } from "@playwright/test";
import { Metadata } from "../fixtures/part-1/data/companyMetaData";

export class CompanyPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async assertCompanyMetadata(expectedMetadata: Metadata) {
        for (const key of Object.keys(expectedMetadata)) {
            const metadataKeyLocator = this.page.locator(
                `//*[@class="pageMetaDetails"]/descendant::strong[contains(text(),'${key}')]/../descendant::span`
            );
            const elements = await metadataKeyLocator.all();
            const value = expectedMetadata[key];

            if (Array.isArray(value)) {
                for (let i = 0; i < elements.length; i++) {
                    await expect(elements[i]).toHaveText(value[i]);
                }
            } else {
                await expect(metadataKeyLocator).toHaveText(value);
            }
        }
    }

    async assertPageUrl() {
        await expect(this.page).toHaveURL(
            "https://symphony.is/about-us/company"
        );
    }
}
