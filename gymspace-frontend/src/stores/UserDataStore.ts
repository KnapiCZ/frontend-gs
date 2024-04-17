import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userDataStore = defineStore('userDataStore', {
	state: () => {
		return {
			remove: false,
			componentKey: ref(0),
			renderedUserId: -1,
			loggedUserId: -1,
			followersCount: -1,
			userChallengeId: [] as number[],
			allGymsId: [] as number[],
			userGymId: [] as number[],
			userDivisionId: [] as number[],
			userPostsId: [] as number[],
			userPostsKey: [] as number[],
			userFollowersId: [] as number[],

			user: '',
			editedUser: '',
			choosenPhoto: '',
			profilePicture: '',
			backgroundPicture: '',

			croppedChoosenPhoto: ''

		}
	}
})
