import { AddressDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class AddressDatabase extends BaseDatabase {

    public static TABLE_ADDRESS: string = "addresses"

    public createAddress = async (input: Array<AddressDB>) => {

        await AddressDatabase.connection(AddressDatabase.TABLE_ADDRESS).insert(input)
        
    }
}