import type { ApiResponse } from "../types/response"
import type { Division, DivisionMember, DivisionSpotter, CreateDivisionPayload, UpdateDivisionPayload } from "../types/division"
import getConfig from "./apiConfig"

const BASE_URL = getConfig().apiBaseUrl
const HEADERS = getConfig().headers

export const divisionApi = {

    async getAll(): Promise<ApiResponse<Division[]>> {
        const response = await fetch(`${BASE_URL}api/division/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async getUsersDivisions(divisionId: number): Promise<ApiResponse<Division>> {
        const response = await fetch(`${BASE_URL}api/division/${divisionId}/users-divisions/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async getInfo(divisionId: number, fields?: string): Promise<ApiResponse<Partial<Division>>> {
        const response = await fetch(`${BASE_URL}api/division/${divisionId}/?fields=${fields}`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async getGymDivisions(divisionId: number): Promise<ApiResponse<Division[]>> {
        const response = await fetch(`${BASE_URL}api/division/${divisionId}/gym-divisions/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async getMember(divisionId: number): Promise<ApiResponse<DivisionMember>> {
        const response = await fetch(`${BASE_URL}api/division-member/${divisionId}/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async joinMember(divisionId: number): Promise<ApiResponse<DivisionMember>> {
        const response = await fetch(`${BASE_URL}api/division-member/?query_params=${divisionId}`, {
            method: "POST",
            headers: HEADERS,
        })
        return await response.json()
    },

    async updateMember(divisionId: number, userId?: string): Promise<ApiResponse<DivisionMember>> {
        const response = await fetch(
            `${BASE_URL}api/division-member/${divisionId}/?query_params=${userId}`,
            {
                method: "PATCH",
                headers: HEADERS,
            },
        )
        return await response.json()
    },

    async leaveMember(divisionId: number): Promise<ApiResponse<null>> {
        const response = await fetch(`${BASE_URL}api/division-member/${divisionId}/`, {
            method: "DELETE",
            headers: HEADERS,
        })
        return await response.json()
    },

    async getSpotter(divisionId: number): Promise<ApiResponse<DivisionSpotter>> {
        const response = await fetch(`${BASE_URL}api/division-spotter/${divisionId}/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async joinSpotter(divisionId: number): Promise<ApiResponse<DivisionSpotter>> {
        const response = await fetch(`${BASE_URL}api/division-spotter/?query_params=${divisionId}`, {
            method: "POST",
            headers: HEADERS,
        })
        return await response.json()
    },

    async leaveSpotter(divisionId: number): Promise<ApiResponse<null>> {
        const response = await fetch(`${BASE_URL}api/division-spotter/${divisionId}/`, {
            method: "DELETE",
            headers: HEADERS,
        })
        return await response.json()
    }
}

export default divisionApi
