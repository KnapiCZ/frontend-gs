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

    const baseUrl = `https://gymspace-app-t6hic.ondigitalocean.app/`
    let response
    let data

    switch (apiType) {
        case "getToken":
            data = { "username": username, "password": password }
            try {
                response = await fetch(`${baseUrl}api-auth/`, {
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
                response = await fetch(`${baseUrl}api/confirm-auth/`, {
                    method: "POST",
                    headers: {
                        'Authorization': 'Token ' + localStorage.getItem("Token"),
                        "Content-Type": "application/json",
                    },
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
