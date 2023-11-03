// API pro posty obecne zatim


async function apiPost(apiType = '', firstItem?: unknown) {
    const baseUrl = `http://localhost:8080`
    let response

    switch (apiType) {
        case "getUserPost":
            response = await (
                fetch(`${baseUrl}/api/users-posts/${firstItem}/`,
                    {
                        credentials: "include",
                    })
            );
            return await response.json()

        case "recommendedPosts":
            response = await (
                fetch(`${baseUrl}/api/users-gympage-recommended/${firstItem}/`,
                    {
                        credentials: "include"
                    })
            );
            return await response.json()

        default:
            return `${baseUrl}`
    }
}

export default apiPost
