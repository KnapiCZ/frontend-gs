export interface Post {
    id: number
    user_id: number
    division?: number
    description: string
    media: Media[]
    mentioned_users: number[]
    likes_count: number
    comments_count: number
    created_at: string
    updated_at: string
}

export interface Media {
    id: number
    post_id: number
    url: string
    media_type: 'image' | 'video'
    created_at: string
}

export interface Like {
    id: number
    post_id: number
    user_id: number
    created_at: string
}

export interface CreatePostPayload {
    user_id: number
    division?: number
    description: string
    media: File[]
    mentioned_users?: number[]
}

export interface UpdatePostPayload {
    description?: string
}

export interface Thumbnail {
    id: number
    post_id: number
    url: string
}
