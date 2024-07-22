// global-api.setup.ts
import { expect, test as setup } from "./fixtures/apiFixture";
import { services } from "../../fixtures/part-2/services";
import dotenv from "dotenv";
dotenv.config();
// Load the .env file

setup("shared token via api login", async ({ request }) => {
    // login with valid credentials
    const response = await services.login(request, {
        username: process.env.PW_USERNAME,
        password: process.env.PW_PASSWORD,
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    const token = responseBody.token;
    // Set the token as an environment variable
    process.env.API_TOKEN = token;
    console.log(`Variable set in .env, API_TOKEN: ${process.env.API_TOKEN}`);
});
