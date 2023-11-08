import { PhoneModel } from "../types/types";

export class Phone {

    constructor(
        private phones: PhoneModel[]
    ){}

    public getPhones = (): PhoneModel[] => {
        return this.phones
    }

    public setPhone = (id: string, newPhone: {phoneNumber: string, updatedAt: string}): void => {
        const index = this.phones.findIndex(phone => phone.id === id)

        if(newPhone){
            this.phones[index] = {... this.phones[index], phoneNumber: newPhone.phoneNumber, updatedAt: newPhone.updatedAt}
        }
    } 
}