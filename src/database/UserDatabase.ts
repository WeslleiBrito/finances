import { EditUserDB, UserDB, UserSignupDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class UserDatabase extends BaseDatabase {

    public static TABLE_USER: string = "users"

    public signup = async (input: UserSignupDB): Promise<void> => {
        
        await UserDatabase.connection(UserDatabase.TABLE_USER).insert(input)
    }

    public findUserById = async (id: string): Promise<UserDB | undefined> => {
        
        const [result]: UserDB[] | undefined[] = await UserDatabase.connection(UserDatabase.TABLE_USER).where({id})

        return result
    }
    
    public findUserByEmail = async (email: string): Promise<UserDB | undefined> => {
        
        const [result]: UserDB[] | undefined[] = await UserDatabase.connection(UserDatabase.TABLE_USER).where({email})
       
        return result
    }

    public findUserByCPFCNPJ = async (cpfCnpj: string): Promise<UserDB | undefined> => {
        
        const [result]: UserDB[] | undefined[] = await UserDatabase.connection(UserDatabase.TABLE_USER).where({cpf_cnpj: cpfCnpj})
       
        return result
    }

    public findRole = async (role: string): Promise<UserDB | undefined> => {
        
        const [result]: UserDB[] | undefined[] = await UserDatabase.connection(UserDatabase.TABLE_USER).where({role})

        return result
    }

    public editAccount = async (input: EditUserDB): Promise<void> => {
        
        const {id, name, last_name, password, updated_at, cpf_cnpj} = input

        await UserDatabase.connection(UserDatabase.TABLE_USER).update({name, last_name, password, updated_at, cpf_cnpj: typeof(cpf_cnpj) !== "undefined" ? cpf_cnpj : null}).where({id})

    }

    public deleteAccount = async (id: string): Promise<void> => {

        await UserDatabase.connection(UserDatabase.TABLE_USER).del().where({id})

    }

}


export interface UserDatabaseI {
    signup (input: UserDB): Promise<void>
    findUserById(id: string): Promise<UserDB | undefined>
    findUserByEmail(email: string): Promise<UserDB | undefined>
    findUserByCPFCNPJ(cpfCnpj: string): Promise<UserDB | undefined>
    findRole(role: string): Promise<UserDB | undefined>
    editAccount(input: {id: string, name: string, password: string}): Promise<void>
    deleteAccount(input: string): Promise<void>
}