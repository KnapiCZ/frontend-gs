import getConfig from "./apiConfig";

/**
 * - all: gets all objects of division or gym
 * - my: gets all objects user is in, ARGS: objectId: id of user
 * - info: gets all info of object we specify in fields, ARGS: objectId=id of gym or division, fields=parent_gym,title,subtitle,description,logo,members
 * - join: adds user to gym or division, ARGS: objectId=id of gym / division, queryParams=user_id
 * - gymDivions: all divisions of gym, ARGS: objectId=id of gym
 * @param apiType type of api you want to use
 * @param objectId id of object you are working with
 * @param fields data of gym or division you want to get default is all
 * @returns data you wanted from api
 */

async function apiGym(apiType = '', objectId?: number, data?: string, fields?: '', queryParams?: string) {
    let response
    switch (apiType) {

        case "all":
            response = await fetch(`${getConfig().apiBaseUrl}api/gym/`,
                {
                    method: 'GET',
                    headers: getConfig().headers
                }
            )
            return await response.json()

        case "my":
            response = await fetch(`${getConfig().apiBaseUrl}api/gym/${objectId}/users-gyms/`,
                {
                    method: 'GET',
                    headers: getConfig().headers
                }
            )
            return await response.json()

        case "create":
            response = await fetch(`${getConfig().apiBaseUrl}api/gym/`,
                {
                    method: 'POST',
                    headers: getConfig().headers,
                    body: data
                }
            )
            return await response.json()

        case "info":
            response = await fetch(`${getConfig().apiBaseUrl}api/gym/${objectId}/?fields=${fields}`,
                {
                    method: 'GET',
                    headers: getConfig().headers
                }
            )
            return await response.json()

        case "join":

            response = await fetch(`${getConfig().apiBaseUrl}api/gym/${objectId}/?user_id=${queryParams}`,
                {
                    method: 'PATCH',
                    headers: getConfig().headers,
                    body: data
                }
            )
            return await response.json()

        case "gymDivisions":
            response = await fetch(`${getConfig().apiBaseUrl}api/division/${objectId}/gym-divisions/`,
                {
                    method: 'GET',
                    headers: getConfig().headers
                }
            )
            return await response.json()

        case "location":
            response = await fetch(`${getConfig().apiBaseUrl}api/gym/gym-location/`,
                {
                    method: 'GET',
                    headers: getConfig().headers
                }
            )
            return await response.json()

        default:
            return `Invalid apiType`
    }

}

export default apiGym
