import type { ApiResponse } from "../types/response"
import type { Gym, GymMember, GymSpotter, CreateGymPayload, UpdateGymPayload } from "../types/gym"
import getConfig from "./apiConfig"

const BASE_URL = getConfig().apiBaseUrl
const HEADERS = getConfig().headers

export const gymApi = {

    async getAll(): Promise<ApiResponse<Gym[]>> {
        const response = await fetch(`${BASE_URL}api/gym/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async getUsersGym(gymId: number): Promise<ApiResponse<Gym>> {
        const response = await fetch(`${BASE_URL}api/gym/${gymId}/users-gym/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async create(data: CreateGymPayload): Promise<ApiResponse<Gym>> {
        const response = await fetch(`${BASE_URL}api/gym/`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(data),
        })
        return await response.json()
    },

    async getInfo(gymId: number, queryParams?: string): Promise<ApiResponse<Partial<Gym>>> {
        const response = await fetch(`${BASE_URL}api/gym/${gymId}/?fields=${queryParams}`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async getLocation(): Promise<ApiResponse<Gym[]>> {
        const response = await fetch(`${BASE_URL}api/gym/gym-location/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async search(query: string): Promise<ApiResponse<Gym[]>> {
        const response = await fetch(`${BASE_URL}api/gym/search-gym/?query=${query}`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async getMember(gymId: number): Promise<ApiResponse<GymMember>> {
        const response = await fetch(`${BASE_URL}api/gym-member/${gymId}/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async joinMember(gymId: number): Promise<ApiResponse<GymMember>> {
        const response = await fetch(`${BASE_URL}api/gym-member/?query_params=${gymId}`, {
            method: "POST",
            headers: HEADERS,
        })
        return await response.json()
    },

    async updateMember(gymId: number, userId?: string): Promise<ApiResponse<GymMember>> {
        const response = await fetch(`${BASE_URL}api/gym-member/${gymId}/?query_params=${userId}`, {
            method: "PATCH",
            headers: HEADERS,
        })
        return await response.json()
    },

    async leaveMember(gymId: number): Promise<ApiResponse<null>> {
        const response = await fetch(`${BASE_URL}api/gym-member/${gymId}/`, {
            method: "DELETE",
            headers: HEADERS,
        })
        return await response.json()
    },

    async getSpotter(gymId: number): Promise<ApiResponse<GymSpotter>> {
        const response = await fetch(`${BASE_URL}api/gym-spotter/${gymId}/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async joinSpotter(gymId: number): Promise<ApiResponse<GymSpotter>> {
        const response = await fetch(`${BASE_URL}api/gym-spotter/?query_params=${gymId}`, {
            method: "POST",
            headers: HEADERS,
        })
        return await response.json()
    },

    async leaveSpotter(gymId: number): Promise<ApiResponse<null>> {
        const response = await fetch(`${BASE_URL}api/gym-spotter/${gymId}/`, {
            method: "DELETE",
            headers: HEADERS,
        })
        return await response.json()
    }
}

export default gymApi
