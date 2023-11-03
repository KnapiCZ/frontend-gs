import { defineStore } from 'pinia'

export const userStore = defineStore('userStore', {
    state: () => {
        return {
            loggedUserId: -1,
            followers: 0,
        }
    }
})
