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
    const baseUrl = `https://gymspace-app-t6hic.ondigitalocean.app/`
    let response
    switch (apiType) {

        case "usersPosts":
            response = await (
                fetch(`${baseUrl}api/posts/${objectId}/users-posts/`,
                    {
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        }
                    })
            );
            return await response.json()

        case "createPost":
            response = await (
                fetch(`${baseUrl}api/posts/`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                        body: data
                    })
            );
            return await response.json()

        case "getPost":
            response = await (
                fetch(`${baseUrl}api/posts/${objectId}/`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        }
                    })
            );
            return await response.json()

        case "updatePost":
            response = await (
                fetch(`${baseUrl}api/posts/${objectId}/`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                        body: data
                    })
            );
            return await response.json()

        case "deletePost":
            response = await (
                fetch(`${baseUrl}api/posts/${objectId}/`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                        body: data
                    })
            );
            return await response.json()

        case "getThumbnail":
            response = await (
                fetch(`${baseUrl}api/users-posts/thumbnail/${objectId}/`,
                    {
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                    })
            );
            return await response.json()

        case "postLiked":
            response = await (
                fetch(`${baseUrl}api/like/${objectId}/?user_id=${queryParams}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        }
                    })
            );
            return await response.json()

        case "updateLike":
            response = await (
                fetch(`${baseUrl}api/like/${objectId}/?user_id=${queryParams}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        }
                    })
            );
            return await response.json()

        case "recommendedPosts":
            response = await (
                fetch(`${baseUrl}api/users-gympage-recommended/${objectId}/`,
                    {
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                    })
            );
            return await response.json()

        case "gymPosts":
            response = await (
                fetch(`${baseUrl}api/gym-posts/${objectId}/`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                    })
            );
            return await response.json()

        case "divisionPosts":
            response = await (
                fetch(`${baseUrl}api/division-posts/${objectId}/`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                    })
            );
            return await response.json()

        default:
            return `Invalid apiType`
    }
}

export default apiPost
