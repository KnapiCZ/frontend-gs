import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('counter', {
    state: () => {
        return {
            count: 0 as number,
        }
    }
})
