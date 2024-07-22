import { APIRequestContext, APIResponse } from "@playwright/test";
import { SignupRequestModel } from "./models/signup";
import { loginUrl, postCommentPreviewsUrl, postCommentsUrl, postsUrl, signupUrl } from "./apiResources";
import { LoginRequestModel } from "./models/login";
import { PostRequestModel } from "./models/post";
import { PostCommentRequestModel } from "./models/postComment";

export interface Services {
    signup(request: APIRequestContext, signupRequestModel: SignupRequestModel): Promise<APIResponse>;
    login(request: APIRequestContext, loginRequestModel: LoginRequestModel): Promise<APIResponse>;
    createPost(request: APIRequestContext, token: string | undefined, PostRequestModel: PostRequestModel): Promise<APIResponse>;
    addPostComment(request: APIRequestContext, token: string, postCommentModel: PostCommentRequestModel): Promise<APIResponse>;
    getPostComments(request: APIRequestContext, token: string, postId: number): Promise<APIResponse>;
}

export const services: Services = {
    signup: async (request, signupRequestModel: SignupRequestModel) => {
        return await request.post(signupUrl, {
            data: signupRequestModel,
        });
    },
    login: async (request, loginRequestModel: LoginRequestModel) => {
        return await request.post(loginUrl, {
            data: loginRequestModel,
        });
    },
    createPost: async (request, token: string | undefined, postRequestModel: PostRequestModel) => {
        return await request.post(postsUrl, {
            data: postRequestModel,
            headers: {
                Authorization: `token ${token}`,
            },
        });
    },
    addPostComment: async (request, token: string | undefined, postCommentModel: PostCommentRequestModel) => {
        return await request.post(postCommentsUrl, {
            data: postCommentModel,
            headers: {
                Authorization: `token ${token}`,
            },
        });
    },
    getPostComments: async (request, token: string | undefined, postId: number) => {
        return await request.get(postCommentPreviewsUrl(postId), {
            headers: {
                Authorization: `token ${token}`,
            },
        });
    },
};
