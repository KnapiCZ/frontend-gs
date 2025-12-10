import getConfig from "./apiConfig"

/**
 * if arguments are not specified for case -> use undefined
 * @description apiTypes:
 * - getToken: gets users token for authorization
 * - confirmAuth: used for checking if token is valid
 * 
 * @param apiType - used to select one of apiTypes
 * @param username - users username
 * @param password - users password
 * @returns  Response
 */

async function apiAuth(apiType = '', data = '') {

    let response

    switch (apiType) {
        case "getToken":
            try {
                response = await fetch(`${getConfig().apiBaseUrl}api-auth/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: data
                });
                return response.json();
            } catch (error) {
                console.error("Error fetching token:", error);
                throw error;
            }

        case "confirmAuth":
            try {
                response = await fetch(`${getConfig().apiBaseUrl}api/confirm-auth/`, {
                    method: "POST",
                    headers: getConfig().headers
                });
                return response.json();
            } catch (error) {
                console.error("Error confirming: ", error);
                throw error;
            }
        case "send2FA":
            try {
                response = await fetch(`${getConfig().apiBaseUrl}api/twofa/setup/`, {
                    method: "POST",
                    headers: getConfig().headers
                });
                return response.json();
            } catch (error) {
                console.error("Error confirming: ", error);
                throw error;
            }
        case "confirm2FA":
            try {
                response = await fetch(`${getConfig().apiBaseUrl}api/twofa/verify/`, {
                    method: "POST",
                    headers: getConfig().headers,
                    body: data
                });
                return response.json();
            } catch (error) {
                console.error("Error confirming: ", error);
                throw error;
            }

        default:
            return `Invalid apiType`
    }
}

export default apiAuth
