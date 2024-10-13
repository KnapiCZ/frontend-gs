//! API pro Challenges


async function apiChallenge(apiType = '', firstItem?: number, secondItem?: number, thirdItem?: number) {
    const baseUrl = `http://localhost:8000/`
    let response


    switch (apiType) {

        // * vrati id vsech gymu ve kterych je uzivatel 
        case "allChallengesId":
            response = await (
                fetch(`${baseUrl}api/challenge-id/`,
                    {
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                    }
                )
            );
            return await response.json()

        // * vrati vsechno info o jednom gymu
        case "userChallengesId":
            response = await (
                fetch(`${baseUrl}api/challenge-id/${firstItem}/`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                    }
                )
            );
            return await response.json()

        // * vrati id vsech gymu ve kterych je uzivatel 
        case "challengeInfo":
            response = await (
                fetch(`${baseUrl}api/challenge/${firstItem}/`,
                    {
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                    }
                )
            );
            return await response.json()

        case "getProgress":
            response = await (
                fetch(`${baseUrl}api/challengeProgress/`,
                    {
                        method: "POST",
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ "challenge": firstItem, "user": secondItem })
                    }
                )
            );
            return await response.json()

        case "updateProgress":
            response = await (
                fetch(`${baseUrl}api/challengeProgress/update/`,
                    {
                        method: "PATCH",
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ "challenge": firstItem, "user": secondItem, "progress": thirdItem })
                    }
                )
            );
            return await response.json()

        case "joinChallenge":
            response = await (
                fetch(`${baseUrl}api/joinChallenge/`,
                    {
                        method: "POST",
                        headers: {
                            'Authorization': 'Token ' + localStorage.getItem("Token"),
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ "challenge": firstItem, "user": secondItem })
                    }
                )
            );
            return await response.json()
        default:
            return `${baseUrl}`
    }

}

export default apiChallenge