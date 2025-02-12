import getConfig from "./apiConfig"

/**
 * if arguments are not specified for case -> use undefined
 * @description apiTypes:
 * - create: used for creating user, ARGS: data = handle, username, email, password, passwordCheck 
 * - profile: returns data of user, ARGS: user_id, queryParams = auth_id, id, handle, goal, description, email, contacts, sex, pronouns, profile_picture, background_picture, width, height
 * - update: updates users profile, ARGS: user_id, data = goal, description, email, contacts, sex, pronouns, profile_picture, background_picture, width, height 
 * - delete: deletes user profile, ARGS: user_id, data = token(2fa), email
 * - isFollowing: returns {"is_following": True/False}, ARGS: user_id, queryParams = my_id
 * - usersFollowers: returns {"followers": [1,2,3,...]}, ARGS: user_id
 * - follow: adding logged user to followers, ARGS: user_id, data = my_id
 * @param apiType - used to select one of apiTypes
 * @param user_id - user we are working with (not only logged user)
 * @param data - data needed for api to successfully complete its task
 * @param fields - data of user that you need to work with (if all use '' in fields), IN STRING WITHOUT SPACE -> 'id,handle,etc'
 */

async function apiUser(apiType = "", user_id?: number, data?: string, queryParams?: string) {
    let response

    switch (apiType) {

        case "create":
            response = await fetch(`${getConfig().apiBaseUrl}api/users/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }, body: data
                }
            )
            return await response.json()

        case "profile":
            response = await fetch(`${getConfig().apiBaseUrl}api/users/${user_id}/?fields=${queryParams}/`,
                {
                    method: "GET",
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "delete":
            response = await fetch(`${getConfig().apiBaseUrl}api/users/${user_id}/`,
                {
                    method: "DELETE",
                    headers: getConfig().headers,
                    body: data
                }
            )
            return response.json()

        case "update":
            response = await fetch(`${getConfig().apiBaseUrl}api/users/${user_id}/`,
                {
                    method: "PATCH",
                    headers: getConfig().headers,
                    body: data
                }
            )
            return response.json()

        case "isFollowing":
            response = await fetch(`${getConfig().apiBaseUrl}api/follow/${user_id}/is-following/?user_id=${queryParams}/`,
                {
                    method: "GET",
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "usersFollowers":
            response = await fetch(`${getConfig().apiBaseUrl}api/follow/${user_id}/followers/`,
                {
                    method: "GET",
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "follow":
            response = await fetch(`${getConfig().apiBaseUrl}api/follow/${user_id}/?user_id=${queryParams}/`,
                {
                    method: "PATCH",
                    headers: getConfig().headers
                }
            )
            return response.json()

        default:
            return `Invalid apiType`
    }
}

export default apiUser
