import { defineStore } from 'pinia'

import apiUser from '@/logic/API/apiUser'

//
//
//  data se v pinee updatuji ale z nejakeho duvodu se to nechce dostavat do templatu
//  proc to kurva nejede vzdyt na reload se mi vypisou data z getteru userData a ty data jsou spravne
//


export const userDataStore = defineStore('userDataStore', {
    state: () => {
        return {
            loggedUserId: 1,
            followersCount: -1
        }
    },
})
