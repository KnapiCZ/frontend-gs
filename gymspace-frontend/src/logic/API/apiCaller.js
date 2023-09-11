
//const url = ref("http://127.0.0.1:8000/api/users/"+userId)
async function callApi(apiType="", firstItem=1, secondItem=2) {
  const baseUrl = `http://localhost:8080`
  let response
  let data
  switch(apiType)
   {  
      case "getToken":
       data = {"username":firstItem.username,"password":firstItem.password}
       console.log(data)
        try {
          response = await fetch(`${baseUrl}/api-auth/`, { 
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          });
          return response.json();
        } catch (error) {
          console.error("Error fetching token:", error);
          throw error;
        }

      case "confirmAuth":
        try {
          response = await fetch(`${baseUrl}/api/confirm-auth/`, { 
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });
          return response.json();
        } catch (error) {
          console.error("Error confirming: ", error);
          throw error;
        }

      case "userProfile":
        
        response = await(
          fetch(`${baseUrl}/api/users/${firstItem}/`, 
            {
              withCredentials: true,
              credentials: "include",
            })

        );
        return response.json()
      case "smallUserProfile":
        response = await(
          fetch(`${baseUrl}/api/users-small/${firstItem}/`,
            {
              credentials: "include",
            })

        );
        return response.json()

      case "userFollowerCount":
        response = await(
          fetch(`${baseUrl}/api/users/follow/${firstItem}/`,
            {
              credentials: "include",
            })
        );
        return await response.json()
      
      case "follow":
        const follow_data = {"followers": firstItem, "id": secondItem}
        response = await(
          fetch(`${baseUrl}/api/users-follow/${secondItem}/`,
            {
              method: "PATCH",
              credentials: "include",
              headers:  {
                "Content-Type": "application/json",
            },
              body: JSON.stringify(follow_data),
            })
        )
        return response.json()
      
      case "isFollowing":
        response = await(
          fetch(`${baseUrl}/api/users-follow-data/${secondItem}/`,
            {
              method: "GET",
              credentials: "include"
            })
        )
        return response.json()

      case "twoMostPopular":
        response = await(
          fetch(`${baseUrl}/api/users-most-followed/${firstItem}/`,
            {
              credentials: "include"
            })
        );
        return await response.json()

      case "getUserPost":
        response = await(
          fetch(`${baseUrl}/api/users-posts/${firstItem}/`,
            {
              credentials: "include",
            })
        );
        return await response.json()

      case "recommendedPosts":
        response = await(
          fetch(`${baseUrl}/api/users-gympage-recommended/${firstItem}/`,
            {
              credentials: "include"
            })
        );
        return await response.json()



      case "gymsMember":
        response = await(
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

export default callApi
