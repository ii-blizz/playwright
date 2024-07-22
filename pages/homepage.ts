import { Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly homepageLocator: Locator;
    readonly aboutUsLocator: Locator;
    readonly careersLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homepageLocator = page.locator(".homeTopSection");
        this.aboutUsLocator = page.locator(
            '//*[@class="header--nav-label"][contains(text(),"About Us")]/..'
        );
        this.careersLocator = page.locator(
            '.header--nav-item [href="/careers"]'
        );
    }

    // example of using getters for locators, reason:
    // 1. In case of POM with lot of locators (getters == lazy init)
    // 2. In case of multi locator configuration (e.g. diff. locators between browsers)
    get companyLocator() {
        return this.page.locator("[href='/about-us/company']");
    }

    async assertPage() {
        await this.homepageLocator.waitFor();
    }

    async expandAboutUs() {
        await this.aboutUsLocator.hover();
    }

    async goToCompanyPage() {
        await this.expandAboutUs();
        await this.companyLocator.click();
    }

    async goToCareersPage() {
        await this.careersLocator.click();
    }
}
