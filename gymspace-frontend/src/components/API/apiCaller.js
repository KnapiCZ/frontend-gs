
//const url = ref("http://127.0.0.1:8000/api/users/"+userId)
async function callApi(apiType="", firstId=1, secondId=2) {
  const baseUrl = `http://10.0.45.50:8080`
  let response
  switch(apiType)
   {
      case "userProfile":
        response = await(fetch(`${baseUrl}/api/users/${firstId}`));
        return response.json()

      case "userFollowerCount":
        response = await(fetch(`${baseUrl}/api/users/follow/${firstId}`));
        return await response.json()
      
      case "follow":
        const follow_data = {"followers": firstId, "id": secondId}
        response = await(fetch(`${baseUrl}/api/follow/${secondId}/`, {
          method: "PATCH",
          headers:  {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(follow_data),
        }))
        return response.json()
      
      case "isFollowing":
        response = await(fetch(`${baseUrl}/api/follow-data/${secondId}`, {
          method: "GET",
        }))
        return response.json()

      default:
        return `${baseUrl}`
   }
}

export default callApi
