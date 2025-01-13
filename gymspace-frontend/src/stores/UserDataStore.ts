import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userDataStore = defineStore('userDataStore', {
	state: () => {
		return {
			remove: false,
			componentKey: ref(0),
			renderedUserId: -1,
			loggedUserId: -1,
			userChallengeId: [] as number[],
			allGymsId: [] as number[],
			userGymId: [] as number[],
			userDivisionId: [] as number[],
			userPostsId: [] as number[],
			userPostsKey: [] as number[],
			userSports: -1,

			user: '',
			birthday: "",
			editedUser: '',
			choosenPhoto: '',
			profilePicture: '',
			backgroundPicture: '',
			croppedChoosenPhoto: '',

			clickedChallenge: 0

		}
	}
})
