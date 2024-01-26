import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userDataStore = defineStore('userDataStore', {
	state: () => {
		return {
			edited: true,
			componentKey: ref(0),
			baseUrl: "http://localhost:8080/",
			renderedUserId: -1,
			loggedUserId: -1,
			followersCount: -1,
			user: "",
			editedUser: "",
		}
	}
})
