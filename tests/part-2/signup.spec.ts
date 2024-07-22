import { expect, test } from "./fixtures/apiFixture";
import { SignupRequestModel, generateUniqueSignupRequestModel } from "../../fixtures/part-2/models/signup";
import { services } from "../../fixtures/part-2/services";
import { signupScenarios } from "../../fixtures/part-2/data/signup.json";

test("Signup happy path", async ({ request }) => {
    const signupRequestModel: SignupRequestModel = generateUniqueSignupRequestModel();
    const signupResponse = await services.signup(request, signupRequestModel);
    expect(signupResponse.status()).toBe(201);
});

for (let doc of signupScenarios) {
    test(`${doc.tc_id} - ${doc.tc_description}`, async ({ request }) => {
        // @ts-expect-error
        // due to TC missing required property username
        let _data: SignupRequestModel = doc.data;

        // ACT:
        const response = await services.signup(request, _data);

        // ASSERT:
        expect(response.status()).toBe(doc.expectedResponse.code);
        const responseBody = await response.json();
        expect(responseBody).toStrictEqual(doc.expectedResponse.body);
    });
}
