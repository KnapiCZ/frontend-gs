import config from "./apiConfig"

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

async function apiAuth(apiType = '', username?: string, password?: string) {

    let response
    let data

    switch (apiType) {
        case "getToken":
            data = { "username_or_email": username, "password": password }
            try {
                response = await fetch(`${config.apiBaseUrl}api-auth/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                });
                return response.json();
            } catch (error) {
                console.error("Error fetching token:", error);
                throw error;
            }

        case "confirmAuth":
            try {
                response = await fetch(`${config.apiBaseUrl}api/confirm-auth/`, {
                    method: "POST",
                    headers: config.headers
                });
                return response.json();
            } catch (error) {
                console.error("Error confirming: ", error);
                throw error;
            }
        case "send2FA":
            try {
                response = await fetch(`${config.apiBaseUrl}api/twofa/setup/`, {
                    method: "POST",
                    headers: config.headers
                });
                return response.json();
            } catch (error) {
                console.error("Error confirming: ", error);
                throw error;
            }
        case "confirm2FA":
            try {
                response = await fetch(`${config.apiBaseUrl}api/twofa/verify/`, {
                    method: "POST",
                    headers: config.headers,
                    body: JSON.stringify({ token: password })
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
