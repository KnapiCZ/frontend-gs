async function apiAuth(apiType = '', firstItem?: string, secondItem?: string) {
    const baseUrl = `http://localhost:8080`
    let response
    let data

    switch (apiType) {
        case "getToken":
            data = { "username": firstItem, "password": secondItem }
            console.log(data)
            try {
                response = await fetch(`${baseUrl}/api-auth/`, {
                    method: "POST",
                    credentials: "include",
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
                response = await fetch(`${baseUrl}/api/confirm-auth/`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return response.json();
            } catch (error) {
                console.error("Error confirming: ", error);
                throw error;
            }

        default:
            return `${baseUrl}`
    }
}

export default apiAuth
