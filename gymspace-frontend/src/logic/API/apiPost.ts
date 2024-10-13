//! API pro POSTY -> informace postu, generace fyp postu a dalsi


async function apiPost(apiType = '', firstId?: number, secondId?: number, data?: unknown) {
    const baseUrl = `http://localhost:8000/`
    let response
    switch (apiType) {
        case "createPost":
            response = await (
                fetch(`${baseUrl}api/users-posts/`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data)
                    })
            );
            return await response.json()

        case "deletePost":
            const delete_data = { 'logged_in_user': secondId, 'post_id': firstId }
            response = await (
                fetch(`${baseUrl}api/users-posts/delete/`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(delete_data)
                    })
            );
            return await response.json()
        //* vraci jeden post s id, author, gym, description, like_count, post_time, media
        case "getPost":
            response = await (
                fetch(`${baseUrl}api/users-posts/${firstId}/`,
                    {
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                    })
            );
            return await response.json()

        case "getThumbnail":
            response = await (
                fetch(`${baseUrl}api/users-posts/thumbnail/${firstId}/`,
                    {
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                    })
            );
            return await response.json()

        //* vrati stejne co alluserpostdetail
        case "recommendedPosts":
            response = await (
                fetch(`${baseUrl}api/users-gympage-recommended/${firstId}/`,
                    {
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                    })
            );
            return await response.json()

        //* vrati seznam vsech uzivatelovych postu Objct[Post,Post,...]
        // * Post = {id,  author, body, gym, like_count, media[], post_time}
        case "allUserPostsDetail":
            response = await (
                fetch(`${baseUrl}api/users-posts-all-detail/${firstId}/`,
                    {
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                    })
            );
            return await response.json()

        //* vrati id, username, profile_picture, handle, auth_id
        case "allUserPostId":
            response = await (
                fetch(`${baseUrl}api/users-posts-all-id/${firstId}/`,
                    {
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                    })
            );
            return await response.json()

        //* updatuje danemu postu description
        case "updatePost":
            let update_data = { 'logged_in_user': secondId, 'post_id': firstId, 'description': data }
            response = await (
                fetch(`${baseUrl}api/users-posts/update/`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(update_data)
                    })
            );
            return await response.json()

        //* vraci zda uzivatel (secondId) liknul post (firstId)
        case "postLiked":
            let liked_data = { 'logged_in_user': secondId, 'post_id': firstId }
            response = await (
                fetch(`${baseUrl}api/users-posts-liked-status/`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
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
                fetch(`${baseUrl}api/users-posts-liked-status/like/`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(like_data)
                    })
            );
            return await response.json()
        case "gymPosts":
            response = await (
                fetch(`${baseUrl}api/gym-posts/${firstId}/`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                    })
            );
            return await response.json()
        case "divisionPosts":
            response = await (
                fetch(`${baseUrl}api/division-posts/${firstId}/`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                    })
            );
            return await response.json()

        default:
            return `${baseUrl}`
    }
}

export default apiPost
