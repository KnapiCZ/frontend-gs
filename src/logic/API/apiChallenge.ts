import getConfig from "./apiConfig"

/**
 * if arguments are not specified for case -> use undefined
 * @description apiTypes:
 * - allChallengesId: returns id of all challenges, ARGS: object_id
 * - getChallenge: returns data of challenge, ARGS: object_id
 * - getProgress: returns data of progress, ARGS: object_id
 * - createProgress: create progress, used when user joins new challenge, ARGS: data= user, challenge
 * - updateProgress: update progress of user (new video), ARGS: not done yet
 * - getVote: get vote data for specific progress and user ARGS: data = progress, user
 * - createVote: create vote for progress and user (user upvoted/downvoted) , ARGS: data = progress, user, upvote=True/False
 * - updateVote: used for updating vote (user changed from upvote to downovote, etc.)
 * - deleteVote: user unvoted progress, ARGS: object_id
 * @param apiType - used to select one of apiTypes
 * @param object_id - id of object we are working with progress, challenge or vote
 * @param data - data needed for api needs successfully complete its task
 * @param fields - (NOT USED NOW)data of user that you need to work with (if all use '' in fields), IN STRING WITHOUT SPACE -> 'id,handle,etc'
 */

async function apiChallenge(apiType = "", object_id?: number, data?: string) {
    let response

    switch (apiType) {
        case "allChallengesId":
            response = await fetch(`${getConfig().apiBaseUrl}api/challenge/`, {
                method: "GET",
                headers: getConfig().headers,
            })
            return await response.json()

        case "getChallenge":
            response = await fetch(`${getConfig().apiBaseUrl}api/challenge/${object_id}/`, {
                method: "GET",
                headers: getConfig().headers,
            })
            return await response.json()

        case "createChallenge":
            response = await fetch(`${getConfig().apiBaseUrl}api/challenge/${object_id}/`, {
                method: "GET",
                headers: getConfig().headers,
            })
            return await response.json()

        case "updateChallenge":
            response = await fetch(`${getConfig().apiBaseUrl}api/challenge/${object_id}/`, {
                method: "GET",
                headers: getConfig().headers,
            })
            return await response.json()

        case "getProgress":
            response = await fetch(`${getConfig().apiBaseUrl}api/progress/${object_id}/`, {
                method: "GET",
                headers: getConfig().headers,
            })
            return await response.json()

        case "createProgress":
            response = await fetch(`${getConfig().apiBaseUrl}api/progress/`, {
                method: "POST",
                headers: getConfig().headers,
                body: data,
            })
            return await response.json()

        case "updateProgress":
            response = await fetch(`${getConfig().apiBaseUrl}api/progress/${object_id}/`, {
                method: "PATCH",
                headers: getConfig().headers,
                body: data,
            })
            return await response.json()

        case "getVote":
            response = await fetch(`${getConfig().apiBaseUrl}api/vote/${object_id}`, {
                method: "GET",
                headers: getConfig().headers,
            })
            return await response.json()

        case "createVote":
            response = await fetch(`${getConfig().apiBaseUrl}api/vote/`, {
                method: "POST",
                headers: getConfig().headers,
                body: data,
            })
            return await response.json()

        case "updateVote":
            response = await fetch(`${getConfig().apiBaseUrl}api/vote/${object_id}/`, {
                method: "POST",
                headers: getConfig().headers,
            })
            return await response.json()

        case "deleteVote":
            response = await fetch(`${getConfig().apiBaseUrl}api/vote/${object_id}/`, {
                method: "POST",
                headers: getConfig().headers,
            })
            return await response.json()

        default:
            return `Invalid apiType`
    }
}

export default apiChallenge
