import getConfig from "./apiConfig"

type ApiType = "all" | "users-gym" | "create" | "info" | "location" | "search" | "member-get" | "member-join" | "member-update" | "member-leave" | "spotter-join" | "spotter-get" | "spotter-leave"

/**
 * - all: all gyms
 * - users-gym: gym of user
 * - info: data of gym || gymId, queryParams
 * - create: xxx
 * - search: xxx
 * - member-get: returns if user is member or not || gymId
 * - member-join: adds user to members || gymId
 * - member-update: change user to admin or !admin || gymId, queryParams=user_id
 * - member-leave: removes user from members || gymId
 * - spotter-get: returns if user is a spotter || gymId
 * - spotter-join: adds user to spotters || queryParams=user_id
 * - spotter-leave: removes user from spotters || gymId
 * @param apiType: type of api you want to use
 * @param gymId: id of gym
 * @param queryParams: data of gym you want to get default is all
 * @returns data: you wanted from api
 */

async function apiGym(apiType: ApiType, gymId?: number, data?: string, queryParams?: string) {
    let response
    switch (apiType) {

        case "all":
            response = await fetch(`${getConfig().apiBaseUrl}api/gym/`,
                {
                    method: 'GET',
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "users-gym":
            response = await fetch(`${getConfig().apiBaseUrl}api/gym/${gymId}/users-gym/`,
                {
                    method: 'GET',
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "create":
            response = await fetch(`${getConfig().apiBaseUrl}api/gym/`,
                {
                    method: 'POST',
                    headers: getConfig().headers,
                    body: data
                }
            )
            return response.json()

        case "info":
            response = await fetch(`${getConfig().apiBaseUrl}api/gym/${gymId}/?fields=${queryParams}`,
                {
                    method: 'GET',
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "location":
            response = await fetch(`${getConfig().apiBaseUrl}api/gym/gym-location/`,
                {
                    method: 'GET',
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "search":
            response = await fetch(`${getConfig().apiBaseUrl}api/gym/search-gym/?query=${queryParams}`,
                {
                    method: 'GET',
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "member-get":
            response = await fetch(`${getConfig().apiBaseUrl}api/gym-member/${gymId}/`,
                {
                    method: 'GET',
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "member-join":
            response = await fetch(`${getConfig().apiBaseUrl}api/gym-member/?query_params=${gymId}`,
                {
                    method: 'POST',
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "member-update":
            response = await fetch(`${getConfig().apiBaseUrl}api/gym-member/${gymId}/?query_params=${queryParams}`,
                {
                    method: 'PATCH',
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "member-leave":
            response = await fetch(`${getConfig().apiBaseUrl}api/gym-member/${gymId}/`,
                {
                    method: 'DELETE',
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "spotter-get":
            response = await fetch(`${getConfig().apiBaseUrl}api/gym-spotter/${gymId}/`,
                {
                    method: 'GET',
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "spotter-join":
            response = await fetch(`${getConfig().apiBaseUrl}api/gym-spotter/?query_params=${gymId}`,
                {
                    method: 'POST',
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "spotter-leave":
            response = await fetch(`${getConfig().apiBaseUrl}api/gym-spotter/${gymId}/`,
                {
                    method: 'DELETE',
                    headers: getConfig().headers
                }
            )
            return response.json()

        default:
            return `Invalid apiType`
    }

}

export default apiGym
