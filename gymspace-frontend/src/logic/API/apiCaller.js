
//const url = ref("http://127.0.0.1:8000/api/users/"+userId)
async function callApi(apiType="", firstId=1, secondId=2) {
  const baseUrl = `http://192.168.113.107:8080`
  let response
  switch(apiType)
   {
      case "userProfile":
        response = await(fetch(`${baseUrl}/api/users/${firstId}/`));
        return response.json()
      case "smallUserProfile":
        response = await(fetch(`${baseUrl}/api/users-small/${firstId}/`));
        return response.json()

      case "userFollowerCount":
        response = await(fetch(`${baseUrl}/api/users/follow/${firstId}/`));
        return await response.json()
      
      case "follow":
        const follow_data = {"followers": firstId, "id": secondId}
        response = await(fetch(`${baseUrl}/api/users-follow/${secondId}/`, {
          method: "PATCH",
          headers:  {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(follow_data),
        }))
        return response.json()
      
      case "isFollowing":
        response = await(fetch(`${baseUrl}/api/users-follow-data/${secondId}/`, {
          method: "GET",
        }))
        return response.json()

      case "twoMostPopular":
        response = await(fetch(`${baseUrl}/api/users-most-followed/${firstId}/`));
        return await response.json()

      case "getUserPost":
        response = await(fetch(`${baseUrl}/api/users-posts/${firstId}/`));
        return await response.json()

      case "recommendedPosts":
        response = await(fetch(`${baseUrl}/api/users-gympage-recommended/${firstId}/`));
        return await response.json()



      case "gymsMember":
        response = await(fetch(`${baseUrl}/api/gyms-member/${firstId}/`));
        return await response.json()

      default:
        return `${baseUrl}`
   }
}

export default callApi
