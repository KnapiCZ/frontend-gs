import { defineStore } from 'pinia'

export const useStore = defineStore('counter', {
    state: () => {
        return {
            count: 0 as number,
        }
    }
})
