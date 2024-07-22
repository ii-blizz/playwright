import { test as base, expect } from "@playwright/test";
import { HomePage } from "../../../pages/homepage";
import { CompanyPage } from "../../../pages/company";
import { CareersPage } from "../../../pages/careers";

interface PageObjects {
    homePage: HomePage;
    companyPage: CompanyPage;
    careersPage: CareersPage;
}

// Define a custom test type with our custom fixtures
const test = base.extend<PageObjects>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    companyPage: async ({ page }, use) => {
        await use(new CompanyPage(page));
    },
    careersPage: async ({ page }, use) => {
        await use(new CareersPage(page));
    },
});

const baseURL = "https://symphony.is";

export { test, expect, baseURL };
