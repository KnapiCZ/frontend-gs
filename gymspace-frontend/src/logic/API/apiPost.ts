import config from "./apiConfig";

/**
 * if arguments are not specified for case -> use undefined
 * @description apiTypes:
 * - usersPosts: returns ids of all users posts, ARGS: data = user
 * - createPost: used to create users post, ARGS: data = division?, mentioned_user[], user_id, description, media[]
 * - getPost: returns data of post, ARGS: objectId
 * - updatePost: used to update post description (for now), ARGS: objectId, data = description
 * - deletePost: used to delete post, ARGS: objectId
 * - getThumbnail: (in progress) 
 * - postLiked: status if user liked post ARGS: objectId=id of post, queryParams=usersId
 * - updateLike: updates like status of user and post, ARGS: objectId, data= user
 * - recommendedPosts: returns ids of posts of users i am following(looged_in user), ARGS: objectId(id of user for now)
 * - gymPosts: Vrati pole ID vsech prispevku do gymu, ARGS: objectId(id of gym)
 * - divisionPosts: Vrati pole ID vsech prispevku do divisionu: ARGS: objectId(id of division)
 * @param apiType - used to select one of apiTypes
 * @param objectId - id of object we are working with progress, challenge or vote
 * @param data - data needed for api needs successfully complete its task
 */


async function apiPost(apiType = '', objectId?: number, data?: string, queryParams?: string) {
    let response
    switch (apiType) {

        case "usersPosts":
            response = await fetch(`${config.apiBaseUrl}api/posts/${objectId}/users-posts/`,
                {
                    method: "GET",
                    headers: config.headers
                }
            )
            return await response.json()

        case "createPost":
            response = await fetch(`${config.apiBaseUrl}api/posts/`,
                {
                    method: "POST",
                    headers: config.headers,
                    body: data
                }
            )
            return await response.json()

        case "getPost":
            response = await fetch(`${config.apiBaseUrl}api/posts/${objectId}/`,
                {
                    method: "GET",
                    headers: config.headers
                }
            )
            return await response.json()

        case "updatePost":
            response = await fetch(`${config.apiBaseUrl}api/posts/${objectId}/`,
                {
                    method: "PATCH",
                    headers: config.headers,
                    body: data
                }
            )
            return await response.json()

        case "deletePost":
            response = await fetch(`${config.apiBaseUrl}api/posts/${objectId}/`,
                {
                    method: 'DELETE',
                    headers: config.headers,
                    body: data
                }
            )
            return await response.json()

        case "getThumbnail":
            response = await fetch(`${config.apiBaseUrl}api/users-posts/thumbnail/${objectId}/`,
                {
                    method: "GET",
                    headers: config.headers
                }
            )
            return await response.json()

        case "postLiked":
            response = await fetch(`${config.apiBaseUrl}api/like/${objectId}/?user_id=${queryParams}`,
                {
                    method: "GET",
                    headers: config.headers
                }
            )
            return await response.json()

        case "updateLike":
            response = await fetch(`${config.apiBaseUrl}api/like/${objectId}/?user_id=${queryParams}`,
                {
                    method: "PATCH",
                    headers: config.headers
                }
            )
            return await response.json()

        case "recommendedPosts":
            response = await fetch(`${config.apiBaseUrl}api/users-gympage-recommended/${objectId}/`,
                {
                    method: "GET",
                    headers: config.headers
                }
            )
            return await response.json()

        case "gymPosts":
            response = await fetch(`${config.apiBaseUrl}api/gym-posts/${objectId}/`,
                {
                    method: "GET",
                    headers: config.headers
                }
            )
            return await response.json()

        case "divisionPosts":
            response = await fetch(`${config.apiBaseUrl}api/division-posts/${objectId}/`,
                {
                    method: "GET",
                    headers: config.headers
                }
            )
            return await response.json()

        default:
            return `Invalid apiType`
    }
}

export default apiPost
