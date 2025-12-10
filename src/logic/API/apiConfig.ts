const getConfig = () => {
    return {
        apiBaseUrl: "http://127.0.0.1:8000/",
        headers: {
            Authorization: "Token " + localStorage.getItem("Token"),
            "Content-Type": "application/json",
        },
    }
}

export default getConfig
