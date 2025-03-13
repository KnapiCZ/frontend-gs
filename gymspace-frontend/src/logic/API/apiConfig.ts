const getConfig = () => {
    return {
        apiBaseUrl: "https://support.gymspace.app/",
        headers: {
            Authorization: "Token " + localStorage.getItem("Token"),
            "Content-Type": "application/json",
        },
    }
}

export default getConfig
