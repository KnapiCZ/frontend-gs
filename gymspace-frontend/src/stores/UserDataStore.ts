import { defineStore } from 'pinia'

export const userDataStore = defineStore('userDataStore', {
	state: () => ({
		remove: false,
		componentKey: 0,
		renderedUserId: -1,
		userChallengeId: [] as number[],
		allGymsId: [] as number[],
		userGymId: [] as number[],
		userDivisionId: [] as number[],
		userPostsId: [] as number[],
		userPostsKey: [] as number[],
		userSports: -1,
		//TODO: implement this as default user
		dict: {} as Record<string, any>,
		user: '',
		birthday: '',
		editedUser: '',
		choosenPhoto: '',
		profilePicture: '',
		backgroundPicture: '',
		croppedChoosenPhoto: '',
		clickedChallenge: 0
	}),
	actions: {
		// Method to add a key-value pair to the dictionary
		addToDict(key: string, value: any) {
			this.dict[key] = value;
		},

		// Method to reset the dictionary
		resetDict() {
			this.dict = {};
		},

		// Method to remove a key from the dictionary
		removeFromDict(key: string) {
			delete this.dict[key];
		},

		getDictAsJson() {
			return JSON.stringify(this.dict);
		},

	},
})
