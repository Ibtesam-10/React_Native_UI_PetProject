export const  API_BASE_URL='https://jsonplaceholder.typicode.com';
export const getAppUrl=(endpoint)=> API_BASE_URL+endpoint;
export const POSTS=getAppUrl('/posts');
export const DELETE_POSTS=getAppUrl('/posts/');