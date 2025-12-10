// The "Envelope" that holds everything
export interface ApiResponse<T = unknown> {
    status: 'success' | 'error'
    message: string
    data: T | null
    error_code: string | null
}