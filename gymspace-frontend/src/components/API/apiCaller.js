
//const url = ref("http://127.0.0.1:8000/api/users/"+userId)
async function callApi(apiType="", id=1) {
  const baseUrl = `http://10.0.45.50:8080`
  switch(apiType)
   {
      case "userProfile":
        var response = await(fetch(`${baseUrl}/api/users/${id}`));
        return response.json()

      case "userFollowerCount":
        var response = await(fetch(`${baseUrl}/api/users/follow/${id}`));
        return await response.json()
      
      default:
        return `${baseUrl}`
   }
}

export default callApi
