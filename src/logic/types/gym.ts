export interface Gym {
    id: number
    title: string
    description?: string
    logo: string
    location?: string
    address?: string
    city?: string
    country?: string
    members_count: number
    spotters_count: number
    count_not_seen_posts: number
    count_not_seen_messages: number
    created_at: string
    updated_at: string
}

export interface GymMember {
    id: number
    gym_id: number
    user_id: number
    is_admin: boolean
    joined_at: string
}

export interface GymSpotter {
    id: number
    gym_id: number
    user_id: number
    joined_at: string
}

export interface GymLocation {
    id: number
    gym_id: number
    latitude: number
    longitude: number
    address: string
}

export interface CreateGymPayload {
    title: string
    description?: string
    logo?: string
    location?: string
    address?: string
    city?: string
    country?: string
}

export interface UpdateGymPayload {
    title?: string
    description?: string
    logo?: string
    location?: string
    address?: string
    city?: string
    country?: string
}
