export interface Challenge {
    id: number
    title: string
    description: string
    goal: number
    image: string
    members: number[]
    created_at: string
    updated_at: string
}

export interface Progress {
    id: number
    challenge: number
    user: number
    progress: number
    completed: boolean
    created_at: string
    updated_at: string
}

export interface Vote {
    id: number
    progress: number
    user: number
    upvote: boolean
    created_at: string
    updated_at: string
}

export interface CreateProgressPayload {
    challenge: number
    user: number
}

export interface UpdateProgressPayload {
    progress: number
    completed?: boolean
}

export interface CreateVotePayload {
    progress: number
    user: number
    upvote: boolean
}
