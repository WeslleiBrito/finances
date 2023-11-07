import { AddressModel } from "../types/types";

export class Address {

    constructor(
        private addresses: Array<AddressModel>
    ){}

    public getAdresses = (): Array<AddressModel> => {
        return this.addresses
    }

    public setAddress = (newAddress: AddressModel) => {
        
        const index = this.addresses.findIndex(item => item.id === newAddress.id)
        this.addresses[index] = newAddress
    
    }
}