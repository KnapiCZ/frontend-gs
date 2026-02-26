import type { ApiResponse } from "../types/response"
import type { Challenge, Progress, Vote, CreateProgressPayload, CreateVotePayload, UpdateProgressPayload } from "../types/challenge"
import getConfig from "./apiConfig"

const BASE_URL = getConfig().apiBaseUrl
const HEADERS = getConfig().headers

export const challengeApi = {

    async allChallengesId(): Promise<ApiResponse<Challenge[]>> {
        const response = await fetch(`${BASE_URL}api/challenge/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async getChallenge(challengeId: number): Promise<ApiResponse<Challenge>> {
        const response = await fetch(`${BASE_URL}api/challenge/${challengeId}/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async createChallenge(challengeId: number): Promise<ApiResponse<Challenge>> {
        const response = await fetch(`${BASE_URL}api/challenge/${challengeId}/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async updateChallenge(challengeId: number): Promise<ApiResponse<Challenge>> {
        const response = await fetch(`${BASE_URL}api/challenge/${challengeId}/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async getProgress(progressId: number): Promise<ApiResponse<Progress>> {
        const response = await fetch(`${BASE_URL}api/progress/${progressId}/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async createProgress(data: CreateProgressPayload): Promise<ApiResponse<Progress>> {
        const response = await fetch(`${BASE_URL}api/progress/`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(data),
        })
        return await response.json()
    },

    async updateProgress(progressId: number, data: UpdateProgressPayload): Promise<ApiResponse<Progress>> {
        const response = await fetch(`${BASE_URL}api/progress/${progressId}/`, {
            method: "PATCH",
            headers: HEADERS,
            body: JSON.stringify(data),
        })
        return await response.json()
    },

    async getVote(voteId: number): Promise<ApiResponse<Vote>> {
        const response = await fetch(`${BASE_URL}api/vote/${voteId}`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async createVote(data: CreateVotePayload): Promise<ApiResponse<Vote>> {
        const response = await fetch(`${BASE_URL}api/vote/`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(data),
        })
        return await response.json()
    },

    async updateVote(voteId: number): Promise<ApiResponse<Vote>> {
        const response = await fetch(`${BASE_URL}api/vote/${voteId}/`, {
            method: "POST",
            headers: HEADERS,
        })
        return await response.json()
    },

    async deleteVote(voteId: number): Promise<ApiResponse<null>> {
        const response = await fetch(`${BASE_URL}api/vote/${voteId}/`, {
            method: "POST",
            headers: HEADERS,
        })
        return await response.json()
    }
}

export default challengeApi
