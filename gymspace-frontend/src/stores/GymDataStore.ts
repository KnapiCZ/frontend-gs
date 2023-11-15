import { defineStore } from 'pinia'
import apiGym from '@/logic/API/apiGym'

interface GymButtonI {
    id: number,
    title: string,
    logo: string
}


export const gymDataStore = defineStore('gymDataStore', {
    state: () => {
        return {
            openedGym: -1,
            gymButtons: [] as GymButtonI[],
        }
    },
    actions: {

        async updateData(loggedUserId: number) {
            this.gymButtons = []
            await apiGym('myGyms', loggedUserId).then((data) => {
                for (let i = 0; i < data.length; i++) {
                    this.gymButtons.push((data[i] as GymButtonI))
                }
            })
        },
    }
})
