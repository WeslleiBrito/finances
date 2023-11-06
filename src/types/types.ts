
export enum USER_ROLES {
    ADMIN = "ADMIN",
    MASTER = "MASTER",
    NORMAL = "NORMAL"
}

export interface UserModel {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    createdAt: string
}

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}