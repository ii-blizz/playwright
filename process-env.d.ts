declare namespace NodeJS {
    interface ProcessEnv {
        API_BASE_URL: string;
        PW_USERNAME: string;
        PW_PASSWORD: string;
        API_TOKEN?: string;
    }
}
