//! API pro uzivatele -> informace uzivatele, jeho sledujici atd

import { userDataStore } from "@/stores/UserDataStore";

async function apiUser(apiType = "", firstId?: number, secondId?: number, data?: string) {
	const baseUrl = `http://192.168.88.86:8080/`
	let response
	switch (apiType) {

		case "createUser":
			response = await (
				fetch(`${baseUrl}/api/create-user/`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: data,
					})
			);
			return response.json()

		//* vrati vsechny informace o uzivateli
		case "userProfile":
			response = await (
				fetch(`${baseUrl}/api/users/${firstId}/`,
					{
						headers: {
							'Authorization': 'Token ' + localStorage.getItem("Token"),
							"Content-Type": "application/json",
						},
					})
			);
			return response.json()

		//* vrati id, username, profile_picture, handle, auth_id
		case "smallUserProfile":
			response = await (
				fetch(`${baseUrl}/api/users-small/${firstId}/`,
					{
						headers: {
							'Authorization': 'Token ' + localStorage.getItem("Token"),
							"Content-Type": "application/json",
						},
					})
			);
			return response.json()


		//* posle do databaze zmenu stavu 
		case "follow":
			const follow_data = { "followers": firstId, "id": secondId }
			response = await (
				fetch(`${baseUrl}/api/users-follow/${secondId}/`,
					{
						method: "PATCH",
						headers: {
							'Authorization': 'Token ' + localStorage.getItem("Token"),
							"Content-Type": "application/json",
						},
						body: JSON.stringify(follow_data),
					})
			);
			return response.json()

		//* vrati seznam lidi kteri sleduji usera (firstId)
		case "isFollowing":
			response = await (
				fetch(`${baseUrl}/api/users-follow-data/${firstId}/`,
					{
						method: "GET",
						headers: {
							'Authorization': 'Token ' + localStorage.getItem("Token"),
							"Content-Type": "application/json",
						},
					})
			);
			return response.json()

		//* updatuje poslane informace uzivatelovi
		case "update":
			response = await (
				fetch(`${baseUrl}/api/users-small/update/`,
					{
						method: "PATCH",
						credentials: "include",
						headers: {
							'Authorization': 'Token ' + localStorage.getItem("Token"),
							"Content-Type": "application/json",
						},
						body: userDataStore().user,
					})
			);
			return response.json()

		default:
			return `${baseUrl}`
	}
}

export default apiUser
