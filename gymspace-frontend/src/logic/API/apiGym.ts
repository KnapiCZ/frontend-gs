import config from "./apiConfig";

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

async function apiGymDiv(apiType = '', objectId?: number, data?: string, fields?: string, queryParams?: string) {
    let response
    switch (apiType) {

        case "all":
            response = await fetch(`${config.apiBaseUrl}api/gym/`,
                {
                    method: 'GET',
                    headers: config.headers
                }
            )
            return await response.json()

        case "my":
            response = await fetch(`${config.apiBaseUrl}api/gym/${objectId}/users-gyms/`,
                {
                    method: 'GET',
                    headers: config.headers
                }
            )
            return await response.json()

        // * vrati vsechno info o jednom gymu
        case "create":
            response = await fetch(`${config.apiBaseUrl}api/gym/`,
                {
                    method: 'POST',
                    headers: config.headers,
                    body: data
                }
            )
            return await response.json()

        // * vrati vsechno info o jednom gymu
        case "info":
            response = await fetch(`${config.apiBaseUrl}api/gym/${objectId}/?fields=${fields}`,
                {
                    method: 'GET',
                    headers: config.headers
                }
            )
            return await response.json()

        // * prida uzivatele (logged_in_user) do gymu (gym_id) 
        case "join":

            response = await fetch(`${config.apiBaseUrl}api/gym/${objectId}/?user_id=${queryParams}`,
                {
                    method: 'PATCH',
                    headers: config.headers,
                    body: data
                }
            )
            return await response.json()

        case "gymDivisions":
            response = await fetch(`${config.apiBaseUrl}api/division/${objectId}/gym-divisions/`,
                {
                    method: 'GET',
                    headers: config.headers
                }
            )
            return await response.json()

        default:
            return `Invalid apiType`
    }

}

export default apiGymDiv
