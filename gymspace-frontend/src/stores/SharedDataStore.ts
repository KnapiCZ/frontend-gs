import { defineStore } from 'pinia'

export const sharedDataStore = defineStore('sharedDataStore', {
    state: () => {
        return {
            baseUrl: `http://localhost:8080`,
        }
    }
})
