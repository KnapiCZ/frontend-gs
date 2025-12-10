export interface User {
    username: string,
    full_name: string,
    email: string,
    birthday: string,
    points: number,
    karma: number,
    sport: null,
    description: string,
    sex: string,
    pronouns: string,
    height: number,
    weight: number,
    trainer_status: boolean,
    count_followers: number,
    count_posts: number,
    profile_picture: string,
    background_picture: string,
    contacts: Contact[]
}

export interface Contact {
    label: string,
    link: string,
    link_type: string
}

export interface CreateUserPayload {
    username: string,
    email: string,
    password: string,
    birthday: string,
}

export interface DeleteUserPayload {
    token: string,
    email: string,
    password: string,
}