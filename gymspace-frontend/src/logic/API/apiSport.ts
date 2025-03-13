import getConfig from "./apiConfig"

/**
 * - allSports: gets all objects of sport
 * - sport: gets one sport, ARGS: objectId: id of sport
 * @param apiType type of api you want to use
 * @param objectId id of object you are working with
 * @returns data you wanted from api
 */

async function apiSport(apiType = "", objectId?: number) {
    let response
    switch (apiType) {
        case "allSports":
            response = await fetch(`${getConfig().apiBaseUrl}api/sport/`, {
                method: "GET",
                headers: getConfig().headers,
            })
            return await response.json()

        case "sport":
            response = await fetch(`${getConfig().apiBaseUrl}api/sport/${objectId}`, {
                method: "GET",
                headers: getConfig().headers,
            })
            return await response.json()

        default:
            return `Invalid apiType`
    }
}

export default apiSport
