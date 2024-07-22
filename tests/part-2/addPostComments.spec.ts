import { expect, test } from "./fixtures/apiFixture";
import { addPostCommentScenarios } from "../../fixtures/part-2/data/addPostComment.json";
import { services } from "../../fixtures/part-2/services";
import { PostResponseModel, generatePostRequestModel } from "../../fixtures/part-2/models/post";
import { PostCommentRequestModel, generatePostCommentRequestModel } from "../../fixtures/part-2/models/postComment";

let postId: number = 0;

test.beforeAll(async ({ request, token }) => {
    // ARRANGE: create shared post entity
    const postResponse = await services.createPost(request, token, generatePostRequestModel());
    expect(postResponse.status()).toBe(201);
    const postResponseBody = await postResponse.json();
    expect(postResponseBody.id).toBeTruthy();
    postId = postResponseBody.id;
    return postId;
});

for (let doc of addPostCommentScenarios) {
    test(`${doc.tc_id} - ${doc.tc_description}`, async ({ request, token }) => {
        // ARRANGE:
        postId = doc.postId !== undefined ? doc.postId : postId;
        let data: PostCommentRequestModel = generatePostCommentRequestModel(postId);
        // @ts-expect-error
        token = doc.expectedResponse.code === 401 ? (doc.token !== undefined ? doc.token : "") : token;

        // ACT:
        const response = await services.addPostComment(request, token, data);

        // ASSERT:
        expect(response.status()).toBe(doc.expectedResponse.code);
        const responseBody = await response.json();
        if (doc.expectedResponse.code === 201) {
            let postCommentResponseBody: PostResponseModel = responseBody;
            expect(postCommentResponseBody.id).toBeTruthy();
            expect(postCommentResponseBody.text).toBe(data.text);
        } else if (doc.expectedResponse.code === 401) {
            expect(responseBody).toStrictEqual(doc.expectedResponse.body);
        }
    });
}
