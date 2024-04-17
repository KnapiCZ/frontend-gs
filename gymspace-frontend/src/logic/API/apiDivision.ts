//! API pro DIVISION

async function apiDivision(apiType = '', firstItem?: number, secondItem?: number) {
    const baseUrl = `http://192.168.88.86:8080/`
    let response

    switch (apiType) {

        // * vrati id vsech gymu ve kterych je uzivatel 
        case "allDivisions":
            response = await (
                fetch(`${baseUrl}/api/divisions-id/`,
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

        case "gymDivisions":
            response = await (
                fetch(`${baseUrl}/api/gym-divisions-id/${firstItem}/`,
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

        case "myDivisions":
            response = await (
                fetch(`${baseUrl}/api/divisions-id/${firstItem}/`,
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
        case "divisionInfo":
            response = await (
                fetch(`${baseUrl}/api/division/${firstItem}/`,
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
        case "joinDivision":
            let data = { "division_id": firstItem, "logged_in_user": secondItem }

            response = await (
                fetch(`${baseUrl}/api/division/join/`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data)
                    }
                )
            );
            return await response.json()

        // * prida uzivatele (logged_in_user) do gymu (gym_id) 
        case "divisionName":
            response = await (
                fetch(`${baseUrl}/api/division-name/${firstItem}/`,
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

export default apiDivision
