import type { ApiResponse } from "../types/response"
import type { CreateUserPayload, DeleteUserPayload, User } from "../types/user"
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

const BASE_URL = getConfig().apiBaseUrl
const HEADERS = getConfig().headers

export const userApi = {

    async create(payload: CreateUserPayload): Promise<ApiResponse<User>> {
        const response = await fetch(`${BASE_URL}api/users/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        return await response.json()
    },

    async getProfile<K extends keyof User>(userId: number, fields: K[]): Promise<ApiResponse<Pick<User, K>>> {
        const queryParams = fields.join(",")
        const response = await fetch(`${BASE_URL}api/users/${userId}/?fields=${queryParams}`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async delete(userId: number, payload: DeleteUserPayload): Promise<ApiResponse<null>> {
        const response = await fetch(`${BASE_URL}api/users/${userId}/`, {
            method: "DELETE",
            headers: HEADERS,
            body: JSON.stringify(payload)
        })
        if (!response.ok) {
            throw new Error("Failed to delete user")
        }
        return await response.json()
    },

    async update(userId: number, payload: Partial<User>): Promise<ApiResponse<User>> {
        const response = await fetch(`${BASE_URL}api/users/${userId}/`, {
            method: "PATCH",
            headers: HEADERS,
            body: JSON.stringify(payload)
        })
        return await response.json()
    },

    async isFollowing(userId: number, myId: number): Promise<ApiResponse<{ is_following: boolean }>> {
        const response = await fetch(
            `${BASE_URL}api/follow/is-following/?user_id=${myId}/`,
            {
                method: "GET",
                headers: HEADERS,
            },
        )
        return await response.json()
    },

    async usersFollowers(userId: number): Promise<ApiResponse<{ followers: number[] }>> {
        const response = await fetch(`${BASE_URL}api/follow/${userId}/followers/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },


    async follow(userId: number): Promise<ApiResponse<{ success: boolean }>> {
        const response = await fetch(`${BASE_URL}api/follow/${userId}/`, {
            method: "PATCH",
            headers: HEADERS,
        })
        return await response.json()

    }
}
export default userApi