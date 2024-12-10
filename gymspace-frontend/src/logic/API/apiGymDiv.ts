//! API pro DIVISION, GYM, MUZe Se ZMENIT
/**
 * - all: gets all objects of division or gym, ARGS: type=gym / division
 * - my: gets all objects user is in, ARGS: type=gym / division, objectId: id of user
 * - info: gets all info of object we specify in fields, ARGS: type=gym / division, objectId=id of gym or division, fields=parent_gym,title,subtitle,description,logo,members
 * - join: adds user to gym or division, ARGS: type=gym / division, objectId=id of gym / division, queryParams=user_id
 * - gymDivions: all divisions of gym, ARGS: objectId=id of gym
 * @param apiType type of api you want to use
 * @param type which data you want division OR gym
 * @param objectId id of object you are working with
 * @param fields data of gym or division you want to get default is all
 * @returns data you wanted from api
 */

async function apiGymDiv(apiType = '', type: string, objectId?: number, data?: string, fields?: string, queryParams?: string) {
    const baseUrl = `https://gymspace-app-t6hic.ondigitalocean.app/`
    let response
    switch (apiType) {

        case "all":
            response = await (
                fetch(`${baseUrl}api/${type}/`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                    }
                )
            );
            return await response.json()

        case "my":
            response = await (
                fetch(`${baseUrl}api/${type}/${objectId}/users-${type}s/`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                    }
                )
            );
            return await response.json()

        // * vrati vsechno info o jednom gymu
        case "info":
            response = await (
                fetch(`${baseUrl}api/${type}/${objectId}/?fields=${fields}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                    }
                )
            );
            return await response.json()

        // * prida uzivatele (logged_in_user) do gymu (gym_id) 
        case "join":

            response = await (
                fetch(`${baseUrl}api/${type}/${objectId}/?user_id=${queryParams}`,
                    {
                        method: 'PATCH',
                        credentials: "include",
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                        body: data
                    }
                )
            )
            return await response.json()

        case "gymDivisions":
            response = await (
                fetch(`${baseUrl}api/division/${objectId}/gym-divisions/`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                    }
                )
            );
            return await response.json()

        default:
            return `Invalid apiType`
    }

}

export default apiGymDiv
