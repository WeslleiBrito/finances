import { PhonesDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class PhoneDatabase extends BaseDatabase {

    public static TABLE_PHONES = "phones"

    public createPhone = async (input: PhonesDB[]): Promise<void> => {

        await PhoneDatabase.connection(PhoneDatabase.TABLE_PHONES).insert(input)

    }

    public findPhoneByUserId = async (userId: string): Promise<PhonesDB[] | undefined> => {

        const result: PhonesDB[] | undefined = await PhoneDatabase.connection(PhoneDatabase.TABLE_PHONES).where({user_id: userId})

        return result
    } 
}