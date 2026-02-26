import type { ApiResponse } from "../types/response"
import type { Sport } from "../types/sport"
import getConfig from "./apiConfig"

const BASE_URL = getConfig().apiBaseUrl
const HEADERS = getConfig().headers

export const sportApi = {

    async getAll(): Promise<ApiResponse<Sport[]>> {
        const response = await fetch(`${BASE_URL}api/sport/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async get(sportId: number): Promise<ApiResponse<Sport>> {
        const response = await fetch(`${BASE_URL}api/sport/${sportId}`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    }
}

export default sportApi
