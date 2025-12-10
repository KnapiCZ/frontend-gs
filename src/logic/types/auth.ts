export interface CredentialsPayload {
    username_or_email: string,
    password: string,
}

export interface Token {
    token: string,
    user_id: string,
}

export interface TwoFAToken {
    token: string,
}