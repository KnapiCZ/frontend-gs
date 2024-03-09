import { defineStore } from 'pinia'
import { ref } from 'vue'

export const sharedDataStore = defineStore('sharedDataStore', {
    state: () => {
        return {
            baseUrl: `http://localhost:8080/`,
            componentKey: ref(0),
        }
    }
})
