//! API pro DIVISION

async function apiGym(apiType = '', firstItem?: number, secondItem?: number) {
    const baseUrl = `http://192.168.88.86:8080/`
    let response

    switch (apiType) {

        // * vrati id vsech gymu ve kterych je uzivatel 
        case "allGyms":
            response = await (
                fetch(`${baseUrl}/api/gyms-id/`,
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

        case "myGyms":
            response = await (
                fetch(`${baseUrl}/api/gyms-id/${firstItem}/`,
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
        case "gymInfo":
            response = await (
                fetch(`${baseUrl}/api/gym/${firstItem}/`,
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
        case "joinGym":
            let data = { "gym_id": firstItem, "logged_in_user": secondItem }

            response = await (
                fetch(`${baseUrl}/api/gym/join/`,
                    {
                        method: 'PATCH',
                        credentials: "include",
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data)
                    }
                )
            )

        default:
            return `${baseUrl}`
    }

}

export default apiGym
