const getConfig = () => {
    return {
        apiBaseUrl: 'https://gymspace-app-t6hic.ondigitalocean.app/',
        headers: {
            'Authorization': 'Token ' + localStorage.getItem("Token"),
            "Content-Type": "application/json",
        },
    };
};

export default getConfig;