import { defineStore } from 'pinia'

export const genericDataStore = defineStore('genericDataStore', {
    state: () => {
        return {
            baseUrl: `http://localhost:8080`,
        }
    }
})
