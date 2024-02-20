//! API pro POSTY -> informace postu, generace fyp postu a dalsi


async function apiPost(apiType = '', firstId?: number, secondId?: number) {
    const baseUrl = `http://localhost:8080/`
    let response
    switch (apiType) {

        //! nefunguje
        case "getUserPost":
            response = await (
                fetch(`${baseUrl}/api/users-posts/${firstId}/`,
                    {
                        credentials: "include",
                    })
            );
            return await response.json()

        //* vrati stejne co alluserpostdetail
        case "recommendedPosts":
            response = await (
                fetch(`${baseUrl}/api/users-gympage-recommended/${firstId}/`,
                    {
                        credentials: "include"
                    })
            );
            return await response.json()

        //* vrati seznam vsech uzivatelovych postu Objct[Post,Post,...]
        // * Post = {id,  author, body, gym, like_count, media[], post_time}
        case "allUserPostsDetail":
            response = await (
                fetch(`${baseUrl}/api/users-posts-all-detail/${firstId}/`,
                    {
                        credentials: "include"
                    })
            );
            return await response.json()


        //* vrati id, username, profile_picture, handle, auth_id
        case "allUserPostId":
            response = await (
                fetch(`${baseUrl}/api/users-posts-all-id/${firstId}/`,
                    {
                        credentials: "include"
                    })
            );
            return await response.json()



        //* vraci zda uzivatel (secondId) liknul post (firstId)
        case "postLiked":
            let liked_data = { 'logged_in_user': secondId, 'post_id': firstId }
            console.log(liked_data)
            response = await (
                fetch(`${baseUrl}/api/users-posts-liked-status/`,
                    {
                        method: 'POST',
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(liked_data)
                    })
            );
            return await response.json()

        //* vrati id, username, profile_picture, handle, auth_id
        case "likePost":
            const like_data = { 'logged_in_user': secondId, 'post_id': firstId }
            response = await (
                fetch(`${baseUrl}/api/users-posts/like/`,
                    {
                        method: 'PATCH',
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(like_data)
                    })
            );
            return await response.json()

        case "deletePost":
            const delete_data = { 'logged_in_user': secondId, 'post_id': firstId }
            response = await (
                fetch(`${baseUrl}/api/users-posts/delete/`,
                    {
                        method: 'DELETE',
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(delete_data)
                    })
            );
            return await response.json()

        default:
            return `${baseUrl}`
    }
}

export default apiPost
