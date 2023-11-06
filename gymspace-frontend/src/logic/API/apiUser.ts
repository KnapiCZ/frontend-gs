// API pro uzivatele


async function apiUser(apiType = "", firstId?: number, secondId?: unknown) {
  const baseUrl = `http://localhost:8080`
  let response
  switch (apiType) {

    case "userProfile":
      response = await (
        fetch(`${baseUrl}/api/users/${firstId}/`,
          {
            credentials: "include",
          })

      );
      return response.json()

    case "smallUserProfile":
      response = await (
        fetch(`${baseUrl}/api/users-small/${firstId}/`,
          {
            credentials: "include",
          })

      );
      return response.json()

    case "userFollowerCount":
      response = await (
        fetch(`${baseUrl}/api/users/follow/${firstId}/`,
          {
            credentials: "include",
          })
      );
      return await response.json()

    case "follow":
      const follow_data = { "followers": firstId, "id": secondId }
      response = await (
        fetch(`${baseUrl}/api/users-follow/${secondId}/`,
          {
            method: "PATCH",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(follow_data),
          })
      )
      return response.json()

    case "isFollowing":
      response = await (
        fetch(`${baseUrl}/api/users-follow-data/${secondId}/`,
          {
            method: "GET",
            credentials: "include"
          })
      )
      return response.json()

    case "twoMostPopular":
      response = await (
        fetch(`${baseUrl}/api/users-most-followed/${firstId}/`,
          {
            credentials: "include"
          })
      );
      return await response.json()

    default:
      return `${baseUrl}`

  }
}

export default apiUser
