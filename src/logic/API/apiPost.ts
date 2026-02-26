import type { ApiResponse } from "../types/response"
import type { Post, Like, Thumbnail, CreatePostPayload, UpdatePostPayload } from "../types/post"
import getConfig from "./apiConfig"

const BASE_URL = getConfig().apiBaseUrl
const HEADERS = getConfig().headers

export const postApi = {

    async getUsersPosts(userId: number): Promise<ApiResponse<number[]>> {
        const response = await fetch(`${BASE_URL}api/posts/${userId}/users-posts/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async create(data: CreatePostPayload): Promise<ApiResponse<Post>> {
        const response = await fetch(`${BASE_URL}api/posts/`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(data),
        })
        return await response.json()
    },

    async get(postId: number): Promise<ApiResponse<Post>> {
        const response = await fetch(`${BASE_URL}api/posts/${postId}/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async update(postId: number, data: UpdatePostPayload): Promise<ApiResponse<Post>> {
        const response = await fetch(`${BASE_URL}api/posts/${postId}/`, {
            method: "PATCH",
            headers: HEADERS,
            body: JSON.stringify(data),
        })
        return await response.json()
    },

    async delete(postId: number): Promise<ApiResponse<null>> {
        const response = await fetch(`${BASE_URL}api/posts/${postId}/`, {
            method: "DELETE",
            headers: HEADERS,
        })
        return await response.json()
    },

    async getThumbnail(postId: number): Promise<ApiResponse<Thumbnail>> {
        const response = await fetch(`${BASE_URL}api/users-posts/thumbnail/${postId}/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async isPostLiked(postId: number, userId: string): Promise<ApiResponse<Like | null>> {
        const response = await fetch(`${BASE_URL}api/like/${postId}/?user_id=${userId}`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async updateLike(postId: number, userId: string): Promise<ApiResponse<Like>> {
        const response = await fetch(`${BASE_URL}api/like/${postId}/?user_id=${userId}`, {
            method: "PATCH",
            headers: HEADERS,
        })
        return await response.json()
    },

    async getRecommendedPosts(userId: number): Promise<ApiResponse<number[]>> {
        const response = await fetch(`${BASE_URL}api/users-gympage-recommended/${userId}/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async getGymPosts(gymId: number): Promise<ApiResponse<number[]>> {
        const response = await fetch(`${BASE_URL}api/gym-posts/${gymId}/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    },

    async getDivisionPosts(divisionId: number): Promise<ApiResponse<number[]>> {
        const response = await fetch(`${BASE_URL}api/division-posts/${divisionId}/`, {
            method: "GET",
            headers: HEADERS,
        })
        return await response.json()
    }
}

export default postApi
