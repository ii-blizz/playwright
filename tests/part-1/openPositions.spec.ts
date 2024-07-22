import { baseURL, test } from "./fixtures/uiFixture";

test("Extract Open Positions", async ({ page, homePage, careersPage }) => {
    await page.goto(baseURL);
    // 4. [20%]
    // - Get the “Title” and “Location” from all open job positions and save the result titles into a .txt file.
    // - The .txt file should look as following: Senior QA Automation, Belgrade, Serbia
    await homePage.goToCareersPage();
    await careersPage.extractOpenPositionsInTextFile();
});
