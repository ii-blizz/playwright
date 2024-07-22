import { defineConfig, devices } from "@playwright/test";
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
//  */
import dotenv from "dotenv";
// Load the .env file
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: "./tests",
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: "html",
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        // headless: false,
        /* Base URL to use in actions like `await page.goto('/')`. */
        // baseURL: 'http://127.0.0.1:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",
    },

    /* Configure projects for major browsers */
    projects: [
        {
            // start maximized requirement is not native in Playwright however decided to stick to your challenge requirement
            // this however breaks the headless run for chromium but can be fixed with further optimization:
            // handle the headless via env. variable and make the properties below conditional only for headless:false
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
                deviceScaleFactor: undefined,
                viewport: null,
                launchOptions: {
                    args: ["--start-maximized"],
                },
            },
            testMatch: /^.*[\/\\]tests[\/\\]part-1[\/\\].*\.spec\.ts$/,
            dependencies: ["api-setup"],
        },

        {
            name: "firefox",
            use: {
                ...devices["Desktop Firefox"],
                deviceScaleFactor: undefined,
                viewport: null,
                launchOptions: {
                    args: ["--kiosk"],
                },
            },
            testMatch: /^.*[\/\\]tests[\/\\]part-1[\/\\].*\.spec\.ts$/,
        },

        {
            name: "webkit",
            use: {
                ...devices["Desktop Safari"],
            },
            testMatch: /^.*[\/\\]tests[\/\\]part-1[\/\\].*\.spec\.ts$/,
        },

        {
            name: "api-setup",
            use: {
                baseURL: process.env.API_BASE_URL, // Base URL for API requests
            },
            testMatch: "**/*.setup.ts",
        },
        {
            name: "api",
            use: {
                baseURL: process.env.API_BASE_URL, // Base URL for API requests
            },
            testMatch: /^.*[\/\\]tests[\/\\]part-2[\/\\].*\.spec\.ts$/, // Match only part-2/API test files (regex for Windows and Linux)
            testIgnore: ["**/happyFlow.spec.ts", "**/login.spec.ts", "**/signup.spec.ts"],
            dependencies: ["api-setup"],
        },
        {
            name: "api-fresh-session",
            use: {
                baseURL: process.env.API_BASE_URL, // Base URL for API requests
            },
            testMatch: ["**/happyFlow.spec.ts", "**/login.spec.ts", "**/signup.spec.ts"],
        },

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
