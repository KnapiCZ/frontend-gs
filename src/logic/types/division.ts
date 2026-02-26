export interface Division {
    id: number
    parent_gym: number
    title: string
    description?: string
    logo: string
    sport_name: string
    members_count: number
    spotters_count: number
    count_not_seen_posts: number
    count_not_seen_messages: number
    created_at: string
    updated_at: string
}

export interface DivisionMember {
    id: number
    division_id: number
    user_id: number
    is_admin: boolean
    joined_at: string
}

export interface DivisionSpotter {
    id: number
    division_id: number
    user_id: number
    joined_at: string
}

export interface CreateDivisionPayload {
    parent_gym: number
    title: string
    description?: string
    logo?: string
    sport_name: string
}

export interface UpdateDivisionPayload {
    title?: string
    description?: string
    logo?: string
    sport_name?: string
}
