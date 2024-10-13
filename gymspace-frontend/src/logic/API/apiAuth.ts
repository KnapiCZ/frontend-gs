//! API pro prihlasovani registraci a pod


async function apiAuth(apiType = '', firstItem?: string, secondItem?: string) {
    const baseUrl = `http://localhost:8000/`
    let response
    let data

    switch (apiType) {
        case "getToken":
            data = { "username": firstItem, "password": secondItem }
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
            return `${baseUrl}`
    }
}

export default apiAuth
