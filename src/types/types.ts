
export enum USER_ROLES {
    ADMIN = "ADMIN",
    MASTER = "MASTER",
    NORMAL = "NORMAL"
}

export interface UserModel {
    id: string,
    name: string,
    lastName: string
    cpfCnpj: string,
    country: string,
    state: string,
    city: string,
    district: string,
    road: string,
    houseNumber: string,
    foneNumber: string,
    email: string,
    password: string,
    role: USER_ROLES,
    createdAt: string
}

export interface UserDB {
    id: string,
    name: string,
    last_name: string,
    cpf_cnpj: string,
    country: string,
    state: string,
    city: string,
    district: string,
    road: string,
    house_number: string,
    fone_number: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export interface EditUserDB {
    id: string,
    name: string,
    last_name: string,
    country: string,
    state: string,
    city: string,
    district: string,
    road: string,
    house_number: string,
    fone_number: string,
    password: string
}