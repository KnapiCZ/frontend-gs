//! API pro uzivatele -> informace uzivatele, jeho sledujici atd

import { userDataStore } from "@/stores/UserDataStore";

async function apiUser(apiType = "", firstId?: number, secondId?: number) {
	const baseUrl = `http://localhost:8080/`
	let response
	switch (apiType) {

		//* vrati vsechny informace o uzivateli
		case "userProfile":
			response = await (
				fetch(`${baseUrl}/api/users/${firstId}/`,
					{
						credentials: "include",
					})
			);
			return response.json()

		//* vrati id, username, profile_picture, handle, auth_id
		case "smallUserProfile":
			response = await (
				fetch(`${baseUrl}/api/users-small/${firstId}/`,
					{
						credentials: "include",
					})
			);
			return response.json()

		//* vrati pocet sledujicich
		//case "userFollowerCount":
		//	response = await (
		//		fetch(`${baseUrl}/api/follow/${firstId}/`,
		//			{
		//				credentials: "include",
		//			})
		//	);
		//	return await response.json()

		//* posle do databaze zmenu stavu 
		case "follow":
			const follow_data = { "followers": firstId, "id": secondId }
			response = await (
				fetch(`${baseUrl}/api/users-follow/${secondId}/`,
					{
						method: "PATCH",
						credentials: "include",
						headers: {
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
						credentials: "include"
					})
			);
			return response.json()

		//* vrati id prvnich dvou sledujicich
		case "twoMostPopular":
			response = await (
				fetch(`${baseUrl}/api/users-most-followed/${firstId}/`,
					{
						credentials: "include"
					})
			);
			return await response.json()

		case "update":
			response = await (
				fetch(`${baseUrl}/api/users-small/update/`,
					{
						method: "PATCH",
						credentials: "include",
						headers: {
							"Content-Type": "application/json",
						},
						body: userDataStore().editedUser,
					})
			);
			return response.json()



		default:
			return `${baseUrl}`
	}
}

export default apiUser
