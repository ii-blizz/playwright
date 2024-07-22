import { uniqueIdGenerator } from "../../../tests/part-2/fixtures/apiFixture";

export type PostCommentRequestModel = {
    text: string;
    post: number;
};

export const generatePostCommentRequestModel = (_post: number): PostCommentRequestModel => {
    return {
        text: "Post Comment test: " + uniqueIdGenerator(),
        post: _post,
    };
};

export type PostCommentResponseModel = {
    id: number;
    user: {
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        country: string;
        city: string;
        jobTitle: string;
        isFollowing: boolean;
        profileImage: any;
        coverImage: any;
    };
    createdOn: string;
    text: string;
};
