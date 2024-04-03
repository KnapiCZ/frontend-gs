import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userDataStore = defineStore('userDataStore', {
	state: () => {
		return {
			edited: true,
			componentKey: ref(0),
			baseUrl: `http://172.20.10.14:8080/`,
			renderedUserId: -1,
			loggedUserId: -1,
			followersCount: -1,
			userChallengeId: [] as number[],
			userGymId: [] as number[],
			userDivisionId: [] as number[],
			userPostsId: [] as number[],
			userPostsKey: [] as number[],

			user: "",
			editedUser: "",
			choosenPhoto: '',
			croppedChoosenPhoto: ''

		}
	}
})
