import { baseURL, test } from "./fixtures/uiFixture";
import { expectedMetadata } from "../../fixtures/part-1/data/companyMetaData";

test("Assert Company Metadata", async ({ page, homePage, companyPage }) => {
    // 1. [5%]
    // - Maximise browser window and navigate to https://symphony.is URL
    // for demo specifics window is set to maximize in playwright.config.ts
    await page.goto(baseURL);
    await homePage.assertPage();

    // 2. [10%]
    // - On the Home page, click on About Us->Company from the top menu
    // - Verify the values of the items from the left side (HQ, Founded, Consulting Offices,Engineering Hubs, Clients)
    // - Verify that the URL is https://symphony.is/about-us/company
    await homePage.goToCompanyPage();
    await companyPage.assertCompanyMetadata(expectedMetadata);
    await companyPage.assertPageUrl();
});
