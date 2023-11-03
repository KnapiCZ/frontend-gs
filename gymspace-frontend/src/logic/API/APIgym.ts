// API pro gymy a cluby

async function apiGym(apiType = '', firstItem?: unknown) {
    const baseUrl = `http://localhost:8080`
    let response

    switch (apiType) {

        case "gymInfo":
            response = await (
                fetch(`${baseUrl}/api/gyms-button/${firstItem}/`,
                    {
                        credentials: "include",
                    }
                )
            );
            return await response.json()


        case "myGyms":
            response = await (
                fetch(`${baseUrl}/api/gyms-member/${firstItem}/`,
                    {
                        credentials: "include",
                    }
                )
            );
            return await response.json()

        default:
            return `${baseUrl}`
    }

}

export default apiGym
