import getConfig from "./apiConfig"

type ApiType = "all" | "users-divisions" | 'gymDivisions' | "create" | "info" | "location" | "search" | "member-get" | "member-join" | "member-update" | "member-leave" | "spotter-join" | "spotter-get" | "spotter-leave"

/**
 * - all: all divisions
 * - my: users divisions
 * - info: data of division || divisionId, fields=parent_gym,title,description,logo,members_count,spotters_count
 * - gymDivions: all divisions of gym || ARGS: divisionId=id of gym
 * - member-get: returns if user is member or not || divisionId
 * - member-join: adds user to members || divisionId
 * - member-update: change user to admin or !admin || divisionId, queryParams=user_id
 * - member-leave: removes user from members || divisionId
 * - spotter-get: returns if user is a spotter || divisionId
 * - spotter-join: adds user to spotters || queryParams=user_id
 * - spotter-leave: removes user from spotters || divisionId
 * @param apiType type of api you want to use
 * @param type which data you want division OR gym
 * @param divisionId id of object you are working with
 * @param fields data of gym or division you want to get default is all
 * @returns data you wanted from api
 */

async function apiDivision(apiType: ApiType, divisionId?: number, data?: string, queryParams?: string) {
    let response
    switch (apiType) {

        case "all":
            response = await fetch(`${getConfig().apiBaseUrl}api/division/`,
                {
                    method: "GET",
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "users-divisions":
            response = await fetch(`${getConfig().apiBaseUrl}api/division/${divisionId}/users-divisions/`,
                {
                    method: "GET",
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "info":
            response = await fetch(`${getConfig().apiBaseUrl}api/division/${divisionId}/?fields=${queryParams}`,
                {
                    method: "GET",
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "gymDivisions":
            response = await fetch(`${getConfig().apiBaseUrl}api/division/${divisionId}/gym-divisions/`,
                {
                    method: "GET",
                    headers: getConfig().headers
                }
            )
            return response.json()


        case "member-get":
            response = await fetch(`${getConfig().apiBaseUrl}api/division-member/${divisionId}/`,
                {
                    method: "GET",
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "member-join":
            console.log('join')
            response = await fetch(`${getConfig().apiBaseUrl}api/division-member/?query_params=${divisionId}`,
                {
                    method: "POST",
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "member-update":
            console.log('update')

            response = await fetch(`${getConfig().apiBaseUrl}api/division-member/${divisionId}/?query_params=${queryParams}`,
                {
                    method: "PATCH",
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "member-leave":
            console.log('leave')

            response = await fetch(`${getConfig().apiBaseUrl}api/division-member/${divisionId}/`,
                {
                    method: "DELETE",
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "spotter-get":
            response = await fetch(`${getConfig().apiBaseUrl}api/division-spotter/${divisionId}/`,
                {
                    method: "GET",
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "spotter-join":
            response = await fetch(`${getConfig().apiBaseUrl}api/division-spotter/?query_params=${divisionId}`,
                {
                    method: "POST",
                    headers: getConfig().headers
                }
            )
            return response.json()

        case "spotter-leave":
            response = await fetch(`${getConfig().apiBaseUrl}api/division-spotter/${divisionId}/`,
                {
                    method: "DELETE",
                    headers: getConfig().headers
                }
            )
            return response.json()


        default:
            return `Invalid apiType`
    }

}

export default apiDivision
