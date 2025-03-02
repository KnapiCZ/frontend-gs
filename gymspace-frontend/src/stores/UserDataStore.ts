import { defineStore } from 'pinia'

interface UserState {
	registerData: Record<string, any>;
	user: Record<string, any>;
	editedUser: Record<string, any>;
}

export const userDataStore = defineStore('userDataStore', {
	state: () => ({
		remove: false,
		componentKey: 0,
		userChallengeId: [] as number[],
		allGymsId: [] as number[],
		userGymId: [] as number[],
		userDivisionId: [] as number[],
		userPostsId: [] as number[],
		userPostsKey: [] as number[],
		userSports: -1,
		registerData: {} as Record<string, any>,
		user: {} as Record<string, any>,
		editedUser: {} as Record<string, any>,
		choosenPhoto: '',
		profilePicture: '',
		backgroundPicture: '',
		croppedChoosenPhoto: '',
		clickedChallenge: 0
	}),
	actions: {

		getFromDict(type: keyof UserState, key: string) {
			return this[type][key];
		},

		// Method to add a key-value pair to the dictionary
		addToDict(type: keyof UserState, key: string, value: any) {
			this[type][key] = value;
		},

		// Method to reset the dictionary
		resetDict(type: keyof UserState) {
			this[type] = {};
		},

		// Method to remove a key from the dictionary
		removeFromDict(type: keyof UserState, key: string) {
			delete this[type][key];
		},

		getDictAsJson(type: keyof UserState) {
			return this[type];
		},

		setDict(value: any) {
			this.user = value
		}
	},
})
