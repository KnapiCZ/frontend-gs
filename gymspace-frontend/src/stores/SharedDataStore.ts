import { defineStore } from "pinia"
import { ref } from "vue"

export const sharedDataStore = defineStore("sharedDataStore", {
    state: () => {
        return {
            baseUrl: localStorage.getItem("baseUrl"),
            componentKey: ref(0),
        }
    },
})
