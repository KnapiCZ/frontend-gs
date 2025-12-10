import type { CredentialsPayload, Token, TwoFAToken } from "../types/auth"
import { ApiResponse } from "../types/response"
import getConfig from "./apiConfig"

/**
 * if arguments are not specified for case -> use undefined
 * @description apiTypes:
 * - getToken: gets users token for authorization
 * - confirmAuth: used for checking if token is valid
 *
 * @returns  Response
 */

const BASE_URL = getConfig().apiBaseUrl
const HEADERS = getConfig().headers

export const authApi = {

    async getToken(credential: CredentialsPayload): Promise<ApiResponse<Token>> {
        const response = await fetch(`${BASE_URL}api-auth/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credential),
        })
        return await response.json()
    },

    async confirmAuth(): Promise<ApiResponse<{ user_id: number }>> {
        const response = await fetch(`${BASE_URL}api/confirm-auth/`, {
            method: "POST",
            headers: HEADERS,
        })
        return await response.json()
    },

    async send2FA(): Promise<ApiResponse<null>> {
        const response = await fetch(`${BASE_URL}api/twofa/setup/`, {
            method: "POST",
            headers: HEADERS,
        })
        return await response.json()
    },

    async confirm2FA(token: TwoFAToken): Promise<ApiResponse<null>> {
        const response = await fetch(`${BASE_URL}api/twofa/verify/`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(token),
        })
        return await response.json()
    }


}


export default authApi
