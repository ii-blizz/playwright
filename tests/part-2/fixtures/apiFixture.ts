// fixtures.ts
import { test as base, expect } from "@playwright/test";
import { randomBytes } from "crypto";
import dotenv from "dotenv";
dotenv.config();

type ApiFixtures = {
    token: string;
};

const test = base.extend<ApiFixtures>({
    token: async ({}, use) => {
        const token = process.env.API_TOKEN;
        if (token) {
            await use(token);
        } else {
            throw new Error("API token not found in environment variables");
        }
    },
});

export { test, expect };

export const uniqueIdGenerator = (): string => randomBytes(10).toString("hex").slice(0, 15);
