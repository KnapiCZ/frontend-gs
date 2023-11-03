// API pro uzivatele


async function apiUser(apiType = "", firstItem?: unknown, secondItem?: unknown) {
  const baseUrl = `http://localhost:8080`
  let response
  switch (apiType) {

    case "userProfile":
      response = await (
        fetch(`${baseUrl}/api/users/${firstItem}/`,
          {
            credentials: "include",
          })

      );
      return response.json()

    case "smallUserProfile":
      response = await (
        fetch(`${baseUrl}/api/users-small/${firstItem}/`,
          {
            credentials: "include",
          })

      );
      return response.json()

    case "userFollowerCount":
      response = await (
        fetch(`${baseUrl}/api/users/follow/${firstItem}/`,
          {
            credentials: "include",
          })
      );
      return await response.json()

    case "follow":
      const follow_data = { "followers": firstItem, "id": secondItem }
      response = await (
        fetch(`${baseUrl}/api/users-follow/${secondItem}/`,
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
        fetch(`${baseUrl}/api/users-follow-data/${secondItem}/`,
          {
            method: "GET",
            credentials: "include"
          })
      )
      return response.json()

    case "twoMostPopular":
      response = await (
        fetch(`${baseUrl}/api/users-most-followed/${firstItem}/`,
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
