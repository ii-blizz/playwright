export type GetPostCommentsRequestModel = {
    id: number;
};

export type GetPostCommentsResponseModel = {
    count: number;
    next: any;
    previous: any;
    results: [
        {
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
        }
    ];
};
