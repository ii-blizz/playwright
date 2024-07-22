import { expect, test } from "./fixtures/apiFixture";
import { loginScenarios } from "../../fixtures/part-2/data/login.json";
import { services } from "../../fixtures/part-2/services";
import {
    LoginNotFoundErrorResponse,
    LoginRequestModel,
    LoginResponseModel,
    LoginValidationErrorResponse,
    isLoginNotFoundErrorResponse,
    isLoginResponseModel,
    isLoginValidationErrorResponse,
} from "../../fixtures/part-2/models/login";

for (let doc of loginScenarios) {
    test(`${doc.tc_id} - ${doc.tc_description}`, async ({ request }) => {
        // ARRANGE:
        let _data: LoginRequestModel = doc.data;

        // ACT:
        const response = await services.login(request, _data);

        // ASSERT:
        expect(response.status()).toBe(doc.expectedResponse.code);
        const responseBody = await response.json();
        if (doc.expectedResponse.code === 200) {
            const loginResponse: LoginResponseModel = responseBody;
            expect(isLoginResponseModel(loginResponse)).toBe(true);
            expect(loginResponse.token).toBeTruthy();
            expect(doc.data.username).toBe(loginResponse.user.username);
        } else if (doc.expectedResponse.code === 400) {
            const loginErrorResponse: LoginValidationErrorResponse = responseBody;
            expect(isLoginValidationErrorResponse(loginErrorResponse)).toBe(true);
            expect(loginErrorResponse).toStrictEqual(doc.expectedResponse.body);
        } else {
            const loginErrorResponse: LoginNotFoundErrorResponse = responseBody;
            expect(isLoginNotFoundErrorResponse(loginErrorResponse)).toBe(true);
            expect(loginErrorResponse.success).toBe(doc.expectedResponse.body?.successs);
        }
    });
}
