import { uniqueIdGenerator } from "../../../tests/part-2/fixtures/apiFixture";

export type SignupRequestModel = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    dateOfBirth: string;
};

export const generateUniqueSignupRequestModel = (): SignupRequestModel => {
    const uniqueId = uniqueIdGenerator();
    const password = uniqueIdGenerator();
    return {
        email: `${uniqueId}@example.com`,
        password: `${password}`,
        firstName: `${uniqueId}-first-name`,
        lastName: `${uniqueId}-last-name`,
        username: `${uniqueId}`,
        dateOfBirth: "12/12/1987",
    };
};
