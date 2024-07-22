// Only this service has been selected to cover another approach with diff req/resp. types and type guards

export type LoginRequestModel = {
    username: string;
    password: string;
};

export type LoginResponseModel = {
    token: string;
    user: {
        id: number;
        username: string;
        firstName: string;
        dateOfBirth: string;
        lastName: string;
        isInfluencer: boolean;
        hasSelectedInfluencers: boolean;
        country: string;
        city: string;
        bio: string;
        jobTitle: string;
        numberOfFollowers: number;
        numberOfFollowings: number;
        profileImage: any;
        coverImage: any;
    };
};

export const isLoginResponseModel = (obj: any): obj is LoginResponseModel => {
    return (
        obj &&
        typeof obj.token === "string" &&
        obj.user &&
        typeof obj.user === "object" &&
        typeof obj.user.id === "number" &&
        typeof obj.user.username === "string" &&
        typeof obj.user.firstName === "string" &&
        typeof obj.user.dateOfBirth === "string" &&
        typeof obj.user.lastName === "string" &&
        typeof obj.user.isInfluencer === "boolean" &&
        typeof obj.user.hasSelectedInfluencers === "boolean" &&
        typeof obj.user.country === "string" &&
        typeof obj.user.city === "string" &&
        typeof obj.user.bio === "string" &&
        typeof obj.user.jobTitle === "string" &&
        typeof obj.user.numberOfFollowers === "number" &&
        typeof obj.user.numberOfFollowings === "number" &&
        (typeof obj.user.profileImage === "string" || obj.user.profileImage === null) &&
        (typeof obj.user.coverImage === "string" || obj.user.coverImage === null)
    );
};

export type LoginValidationErrorResponse = {
    [key: string]: string[];
};

export type LoginNotFoundErrorResponse = {
    success: boolean;
};

export type LoginErrorResponseModel = LoginValidationErrorResponse | LoginNotFoundErrorResponse;

// Type guards
export const isLoginValidationErrorResponse = (obj: any): obj is LoginValidationErrorResponse => {
    return typeof obj === "object" && Object.values(obj).every((val) => Array.isArray(val) && typeof val[0] === "string");
};

export const isLoginNotFoundErrorResponse = (obj: any): obj is LoginNotFoundErrorResponse => {
    return typeof obj === "object" && typeof obj.success === "boolean";
};
