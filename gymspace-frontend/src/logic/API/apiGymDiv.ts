//! API pro DIVISION, GYM

async function apiGymDiv(apiType = '', type = '', firstItem?: number, secondItem?: number) {
    const baseUrl = `http://localhost:8000/`
    let response
    switch (apiType) {

        // * vrati id vsech gymu ve kterych je uzivatel 
        case "all":
            response = await (
                fetch(`${baseUrl}api/${type}s-id/`,
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
                fetch(`${baseUrl}api/${type}s-id/${firstItem}/`,
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
                fetch(`${baseUrl}api/${type}/${firstItem}/`,
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
            let data = { "id": firstItem, "logged_in_user": secondItem }

            response = await (
                fetch(`${baseUrl}api/${type}/join/`,
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
            return await response.json()


        // * prida uzivatele (logged_in_user) do gymu (gym_id) 
        case "divisionName":
            response = await (
                fetch(`${baseUrl}api/division-name/${firstItem}/`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                    }
                )
            )
            return await response.json()


        case "gymDivisions":
            response = await (
                fetch(`${baseUrl}api/gym-divisions-id/${firstItem}/`,
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
            return `${baseUrl}`
    }

}

export default apiGymDiv
