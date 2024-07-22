export const signupUrl = `/api/auth/signup/`;
export const loginUrl = `/api/auth/login/`;
export const postsUrl = `/api/posts/`;
export const postCommentsUrl = `/api/post-comments/`;
export const postCommentPreviewsUrl = (id: number) => {
    return `/api/posts/${id}/comments/`;
};
