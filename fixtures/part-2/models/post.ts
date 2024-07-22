import { uniqueIdGenerator } from "../../../tests/part-2/fixtures/apiFixture";

export type PostRequestModel = {
    text: string;
};

export const generatePostRequestModel = (): PostRequestModel => {
    return {
        text: "Post test: " + uniqueIdGenerator(),
    };
};

export type PostResponseModel = {
    id: number;
    isLikedByUser: boolean;
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
    likesCount: number;
    commentsCount: number;
    image: any;
    isShare: boolean;
    originalPost: any;
    text: string;
    url: any;
    urlMeta: any;
    createdOn: string;
};
