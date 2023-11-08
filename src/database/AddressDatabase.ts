import { AddressDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class AddressDatabase extends BaseDatabase {

    public static TABLE_ADDRESS: string = "addresses"

    public createAddress = async (input: AddressDB[]) => {

        await AddressDatabase.connection(AddressDatabase.TABLE_ADDRESS).insert(input)

    }

    public findAddressesByUserId = async (userId: string): Promise<AddressDB[] | undefined> => {

        const result: AddressDB[] | undefined = await AddressDatabase.connection(AddressDatabase.TABLE_ADDRESS).where({user_id: userId})

        return result
    }
}