import { expect, test } from "./fixtures/apiFixture";
import { getPostCommentScenarios } from "../../fixtures/part-2/data/getPostComments.json";
import { services } from "../../fixtures/part-2/services";
import { generatePostRequestModel } from "../../fixtures/part-2/models/post";
import { PostCommentRequestModel, generatePostCommentRequestModel } from "../../fixtures/part-2/models/postComment";
import { GetPostCommentsRequestModel, GetPostCommentsResponseModel } from "../../fixtures/part-2/models/postCommentPreview";

let postId: number = 0;

test.beforeEach(async ({ request, token }) => {
    // ARRANGE: create shared post entity
    const postResponse = await services.createPost(request, token, generatePostRequestModel());
    expect(postResponse.status()).toBe(201);
    const postResponseBody = await postResponse.json();
    expect(postResponseBody.id).toBeTruthy();
    postId = postResponseBody.id;
    return postId;
});

for (let doc of getPostCommentScenarios) {
    test(`${doc.tc_id} - ${doc.tc_description}`, async ({ request, token }) => {
        // ARRANGE: create comments based on provided number of comments from .json file
        const numberOfComments = doc.numberOfComments !== undefined ? doc.numberOfComments : 0;
        let comments: PostCommentRequestModel[] = [];
        for (let i = 0; i < numberOfComments; i++) {
            // add post comments
            let data: PostCommentRequestModel = generatePostCommentRequestModel(postId);
            let postCommentResponse = await services.addPostComment(request, token, data);
            expect(postCommentResponse.status()).toBe(201);
            comments.push(data);
        }
        // @ts-expect-error
        // handle token for positive and negative scenarios
        token = doc.expectedResponse.code === 401 ? (doc.token !== undefined ? doc.token : "") : token;

        // ACT: get post comments
        const response = await services.getPostComments(request, token, postId);

        // ASSERT:
        expect(response.status()).toBe(doc.expectedResponse.code);
        const responseBody = await response.json();
        if (doc.expectedResponse.code === 201) {
            let getPostCommentResponseBody: GetPostCommentsResponseModel = responseBody;
            expect(getPostCommentResponseBody.count).toStrictEqual(comments.length);
            expect(getPostCommentResponseBody.results).toStrictEqual(comments);
        } else if (doc.expectedResponse.code === 401) {
            expect(responseBody).toStrictEqual(doc.expectedResponse.body);
        }
    });
}
