import { defineStore } from 'pinia'

export const userDataStore = defineStore('userDataStore', {
	state: () => {
		return {
			loggedUserId: 1,
			followersCount: -1
		}
	},
})
