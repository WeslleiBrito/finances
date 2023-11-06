import { USER_ROLES, UserModel } from "../types/types";

export class User {

    constructor(
        private id: string,
        private name: string,
        private lastName: string,
        private cpfCnpj: string,
        private country: string,
        private state: string,
        private city: string,
        private district: string,
        private road: string,
        private houseNumber: string,
        private foneNumber: string,
        private email: string,
        private password: string,
        private role: USER_ROLES,
        private createdAt: string,

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

    public getCountry = (): string => {
        return this.country
    }

    public getState = (): string => {
        return this.state
    }

    public getCity = (): string => {
        return this.city
    }

    public getDistrict = (): string => {
        return this.district
    }

    public getRoad = (): string => {
        return this.road
    }

    public getHouseNumber = (): string => {
        return this.houseNumber
    }

    public getFoneNumber = (): string => {
        return this.foneNumber
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
   

    public getUserModel = (): UserModel => {

        return {
            id: this.id,
            name: this.name,
            lastName: this.lastName,
            cpfCnpj: this.cpfCnpj,
            country: this.country,
            state: this.state,
            city: this.city,
            district: this.district,
            road: this.road,
            houseNumber: this.houseNumber,
            foneNumber: this.foneNumber,
            email: this.email,
            password: this.password,
            role: this.role,
            createdAt: this.createdAt,
        }
    }

    public setName = (newName: string): void => {
        this.name = newName
    }

    public setPassword = (newPassword: string): void => {
        this.password = newPassword
    }

    public setCountry = (newCountry: string): void => {
        this.country = newCountry
    }

    public setState = (newState: string): void => {
        this.state = newState
    }

    public setCity = (newCity: string): void => {
        this.city = newCity
    }

    public setRoad = (newRoad: string): void => {
        this.road = newRoad
    }

    public setHouseNumber = (newHouseNumber: string): void => {
        this.houseNumber = newHouseNumber
    }

    public setFoneNumber = (newFoneNumber: string): void => {
        this.foneNumber = newFoneNumber
    }

    public setDistrict = (newDistrict: string): void => {
        this.district = newDistrict
    }
}