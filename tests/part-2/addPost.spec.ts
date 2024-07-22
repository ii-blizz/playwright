import { expect, test } from "./fixtures/apiFixture";
import { addPostScenarios } from "../../fixtures/part-2/data/addPost.json";
import { services } from "../../fixtures/part-2/services";
import { PostRequestModel, PostResponseModel, generatePostRequestModel } from "../../fixtures/part-2/models/post";

for (let doc of addPostScenarios) {
    test(`${doc.tc_id} - ${doc.tc_description}`, async ({ request, token }) => {
        // ARRANGE:
        let data: PostRequestModel = generatePostRequestModel();
        token = doc.expectedResponse.code === 401 ? (doc.token !== undefined ? doc.token : "") : token;

        // ACT: create post
        const response = await services.createPost(request, token, data);

        // ASSERT:
        expect(response.status()).toBe(doc.expectedResponse.code);
        const responseBody = await response.json();
        if (doc.expectedResponse.code === 201) {
            let postResponseBody: PostResponseModel = responseBody;
            expect(postResponseBody.id).toBeTruthy();
            expect(postResponseBody.text).toBe(data.text);
        } else if (doc.expectedResponse.code === 401) {
            expect(responseBody).toStrictEqual(doc.expectedResponse.body);
        }
    });
}
