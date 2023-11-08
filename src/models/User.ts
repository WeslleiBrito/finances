import { AddressModel, PhoneModel, USER_ROLES, UserModel } from "../types/types";
import { Address } from "./Address";
import { Phone } from "./Phone";

export class User {

    constructor(
        private id: string,
        private name: string,
        private lastName: string,
        private cpfCnpj: string,
        private addresses: Address,
        private foneNumber: Phone,
        private email: string,
        private password: string,
        private role: USER_ROLES,
        private createdAt: string,
        private updateAt: string,

    ){}

    public getId = (): string => {
        return this.id
    }

    public getName = (): string => {
        return this.name
    }

    public getLastName = (): string => {
        return this.lastName
    }

    public getCpfCnpj = (): string => {
        return this.cpfCnpj
    }

    public getAddress = (): AddressModel[] => {
        return this.addresses.getAdresses()
    }

    
    public getFoneNumbers = (): PhoneModel[] => {
        return this.foneNumber.getPhones()
    }

    public getEmail = (): string => {
        return this.email
    }

    public getPassword = (): string => {
        return this.password
    }

    public getRole = (): USER_ROLES => {
        return this.role
    }

    public getCreatedAt = (): string => {
        return this.createdAt
    }
   
    public getUpdateAt = (): string => {
        return this.updateAt
    }

    public getUserModel = (): UserModel => {

        return {
            id: this.id,
            name: this.name,
            lastName: this.lastName,
            cpfCnpj: this.cpfCnpj,
            address: this.addresses.getAdresses(),
            foneNumber: this.foneNumber.getPhones(),
            email: this.email,
            password: this.password,
            role: this.role,
            createdAt: this.createdAt,
            updateAt: this.updateAt
        }
    }

    public setName = (newName: string): void => {
        this.name = newName
    }

    public setPassword = (newPassword: string): void => {
        this.password = newPassword
    }

    public setUpdateAt = (newDate: string): void => {
        this.updateAt = newDate
    }
}