// API pro gymy a cluby

async function apiGym(apiType = '', firstItem?: number, secondItem?: number) {
    const baseUrl = `http://localhost:8080/`
    let response

    switch (apiType) {


        //vrati vsechno info o jednom gymu
        case "gymInfo":
            response = await (
                fetch(`${baseUrl}/api/gyms-button/${firstItem}/`,
                    {
                        credentials: "include",
                    }
                )
            );
            return await response.json()

        //vrati jmeno logo id vsech gymu ve kterych je uzivatel 
        case "myGyms":
            response = await (
                fetch(`${baseUrl}/api/gyms-member/${firstItem}/`,
                    {
                        credentials: "include",
                    }
                )
            );
            return await response.json()

        case "joinClub":
            let data = { "gym_id": firstItem, "logged_in_user": secondItem }

            response = await (
                fetch(`${baseUrl}/api/gyms-join/${firstItem}/`,
                    {
                        method: 'PATCH',
                        credentials: "include",
                        headers: {
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
