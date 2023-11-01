async function apiGym(apiType = '', firstItem?: unknown) {
    const baseUrl = `http://localhost:8080`
    let response

    switch (apiType) {
        case "gymsMember":
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
