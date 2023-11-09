
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
    address: AddressModel[],
    foneNumber: PhoneModel[],
    email: string,
    password: string,
    role: USER_ROLES,
    createdAt: string
    updateAt: string
}

export interface UserDB {
    id: string,
    name: string,
    last_name: string,
    cpf_cnpj: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string,
    updated_at: string
}

export interface UserSignupDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string,
    updated_at: string
}

export interface EditUserDB {
    id: string,
    name: string,
    last_name: string,
    password: string,
    updated_at: string
}

export interface AddressModel {
    id: string,
    userId: string,
    userName: string,
    cep: string,
    country: string,
    state: string,
    city: string,
    district: string,
    road: string,
    houseNumber: string,
    createdAt: string,
    updatedAt: string
}

export interface AddressDB {
    id: string,
    user_id: string,
    user_name: string,
    cep: string,
    country: string,
    state: string,
    city: string,
    district: string,
    road: string,
    house_number: string,
    created_at: string,
    updated_at: string
}

export interface PhonesDB {
    id: string,
    phone_number: string,
    user_id: string,
    created_at: string,
    updated_at: string
}

export interface PhoneModel {
    id: string,
    phoneNumber: string,
    userId: string,
    createdAt: string,
    updatedAt: string
}

export interface AddressInputDTO {
    cep: string,
    country: string,
    state: string,
    city: string,
    district: string,
    road: string,
    houseNumber: string
}