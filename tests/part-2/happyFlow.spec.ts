import { test, expect } from "@playwright/test";
import { LoginResponseModel } from "../../fixtures/part-2/models/login";
import { PostResponseModel } from "../../fixtures/part-2/models/post";
import { PostCommentResponseModel } from "../../fixtures/part-2/models/postComment";
import { GetPostCommentsResponseModel } from "../../fixtures/part-2/models/postCommentPreview";
import { SignupRequestModel, generateUniqueSignupRequestModel } from "../../fixtures/part-2/models/signup";
import { services } from "../../fixtures/part-2/services";

test("Part 2 - Happy flow", async ({ request }) => {
    // !!! Create one scenario where you will Register a new user, Login, Create a post,
    // !!! add a comment on the post you created and get the comments which you previously added
    // 1. Signup
    const signupRequestModel: SignupRequestModel = generateUniqueSignupRequestModel();
    const signupResponse = await services.signup(request, signupRequestModel);
    expect(signupResponse.status()).toBe(201);

    // 2. Login
    const loginResponse = await services.login(request, {
        username: `${signupRequestModel.username}`,
        password: `${signupRequestModel.password}`,
    });
    expect(loginResponse.status()).toBe(200);
    const loginResponseBody: LoginResponseModel = await loginResponse.json();
    const token: string = loginResponseBody.token;

    // 3. Create a post
    const createPostResponse = await services.createPost(request, token, { text: "Post created by " + signupRequestModel.username });
    expect(createPostResponse.status()).toBe(201);
    const createPostResponseBody: PostResponseModel = await createPostResponse.json();
    const postId: number = createPostResponseBody.id;

    // 4. Add a comment on the post
    const addCommentResponse = await services.addPostComment(request, token, {
        text: "Comment on post with id: " + postId,
        post: postId,
    });
    expect(addCommentResponse.status()).toBe(201);
    const addCommentResponseBody: PostCommentResponseModel = await addCommentResponse.json();
    const commentId: number = addCommentResponseBody.id;

    // 5. Get comments
    const getCommentsResponse = await services.getPostComments(request, token, postId);
    expect(getCommentsResponse.status()).toBe(200);
    const getCommentsResponseBody: GetPostCommentsResponseModel = await getCommentsResponse.json();
    expect(getCommentsResponseBody.results.length).toBe(1);
    expect(getCommentsResponseBody.results[0].id).toBe(commentId);
});
