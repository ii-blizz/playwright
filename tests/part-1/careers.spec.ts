import { baseURL, test } from "./fixtures/uiFixture";

test("Count Total Open Positions", async ({ page, homePage, careersPage }) => {
    await page.goto(baseURL);

    // 3. [15%]
    // - Click on Careers and navigate to Current Openings
    // - Count and Assert the number of all opened positions from all locations
    await homePage.goToCareersPage();
    await careersPage.assertPage();
    await careersPage.assertTotalOpenPositions();
});
