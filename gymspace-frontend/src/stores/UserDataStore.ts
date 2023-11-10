import { defineStore } from 'pinia'

export const userDataStore = defineStore('userDataStore', {
	state: () => {
		return {
			renderedUserId: -1,
			loggedUserId: -1,
			followersCount: -1
		}
	},
})
