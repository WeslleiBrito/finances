import { AddressDatabase } from "../database/AddressDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { InputDeleteAccountDTO, OutputDeleteAccountDTO } from "../dtos/user/InputDeleteAccount.dto";
import { InputEditAccountDTO, OutputEditAccountDTO } from "../dtos/user/InputEditAccount.dto";
import { InputLoginDTO, OutputLoginDTO } from "../dtos/user/InputLogin.dto";
import { InputSignupDTO, OutputSignupDTO } from "../dtos/user/InputSignup.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { Address } from "../models/Address";
import { User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { AddressDB, AddressModel, USER_ROLES} from "../types/types";


export class UserBusiness implements UserBusinessI{
    constructor (
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenManager: TokenManager,
        private addressDatabase: AddressDatabase
    ){}

    public signup = async (input: InputSignupDTO): Promise<OutputSignupDTO> => {

        const {name,
            lastName,
            cpfCnpj,
            addresses,
            foneNumber,
            email,
            password
        } = input

        const emailExist = await this.userDatabase.findUserByEmail(email)

        if(emailExist) {
            throw new ConflictError("Email já existe.")
        }

        const id: string = this.idGenerator.generate()

        const hashPassword = await this.hashManager.hash(password)
        const newDate = new Date().toISOString()

        const addressesComplet: AddressModel[] = addresses.map(address => {

            return {
                cep: address.cep,
                city: address.city,
                country: address.country,
                createdAt: newDate,
                district: address.district,
                houseNumber: address.houseNumber,
                id: this.idGenerator.generate(),
                road: address.road,
                state: address.state,
                updatedAt: newDate,
                userId: id,
                userName: name
            }
        })

        const newAddresses = new Address(addressesComplet)

        const newUser = new User(
            id,
            name,
            lastName,
            cpfCnpj.replace(/[^a-zA-Z0-9]/g, ''),
            newAddresses,
            foneNumber,
            email,
            hashPassword,
            USER_ROLES.NORMAL,
            newDate,
            newDate
        )

        await this.userDatabase.signup(
            {
                id: newUser.getId(),
                name: newUser.getName(),
                cpf_cnpj: newUser.getCpfCnpj(),
                last_name: newUser.getLastName(),
                fone_number: newUser.getFoneNumber(),
                email: newUser.getEmail(),
                password: newUser.getPassword(),
                role: newUser.getRole(),
                created_at: newUser.getCreatedAt(),
                updated_at: newUser.getUpdateAt()
            }
        )
        
        const newAaddressesDB: AddressDB[] = newAddresses.getAdresses().map(address => {

            return {
                cep: address.cep,
                city: address.city,
                country: address.country,
                created_at: address.createdAt,
                district: address.district,
                house_number: address.houseNumber,
                id: address.id,
                road: address.road,
                state: address.state,
                updated_at: address.updatedAt,
                user_id: address.userId,
                user_name: address.userName
            }
        })

        await this.addressDatabase.createAddress(newAaddressesDB)

        const token = this.tokenManager.createToken(
            {
                id: newUser.getId(),
                name: newUser.getName(),
                role: newUser.getRole()
            }
        )

        return {
            message: "Cadastro efetuado com sucesso!",
            token
        }
        
    }

    public login = async (input: InputLoginDTO): Promise<OutputLoginDTO> => {
        
        const {email, password} = input

        const account = await this.userDatabase.findUserByEmail(email)

        if(!account){
            throw new NotFoundError("Email ou senha inválida.")
        }

        const passwordValid = await this.hashManager.compare(password, account.password)

        if(!passwordValid){
            throw new UnauthorizedError("Email ou senha inválida.")
        }

        const token = this.tokenManager.createToken(
            {
                id: account.id,
                name: account.name,
                role: account.role
            }
        )
        
        return {
            token,
            idUser: account.id
        }

    }

    public editAccount = async (input: InputEditAccountDTO): Promise<OutputEditAccountDTO> => {
        const {token, id, password, name} = input

        const tokenIsValid = this.tokenManager.validateToken(token)

        if(!tokenIsValid){
            throw new UnauthorizedError("Token inválido")
        }

        const account = await this.userDatabase.findUserById(id)

        if(!account){
            throw new NotFoundError("A conta informada não existe")
        }
        
        if(tokenIsValid.id !== account.id){
            throw new BadRequestError("Apenas o proprietário da conta tem permissão para alterar alguma informação.")
        }

        const addressesExist = await this.addressDatabase.findAddressesByUserId(id)

        if(!addressesExist){
            throw new NotFoundError("O endereço informada não existe")
        }

        const addresses: AddressModel[] = addressesExist.map(address => {
            return {
                cep: address.cep,
                city: address.city,
                country: address.country,
                createdAt: address.created_at,
                district: address.district,
                houseNumber: address.house_number,
                id: address.id,
                road: address.road,
                state: address.state,
                updatedAt: address.updated_at,
                userId: address.user_id,
                userName: address.user_name
            }
        })

        const addressObject = new Address(addresses)

        const newUser = new User(
            account.id,
            account.name,
            account.last_name,
            account.cpf_cnpj,
            addressObject,
            account.fone_number,
            account.email,
            account.password,
            account.role,
            account.created_at,
            account.updated_at
        )

        newUser.setName(name || newUser.getName())
        newUser.setPassword(password || newUser.getPassword())
        newUser.setUpdateAt(new Date().toISOString())

        await this.userDatabase.editAccount({
            id: newUser.getId(),
            name: newUser.getName(),
            last_name: newUser.getLastName(),
            fone_number: newUser.getFoneNumber(),
            password: newUser.getPassword(),
            updated_at: newUser.getUpdateAt()
        })

        return {
            message: "Editado com sucesso!"
        }
    }

    public deleteAccount = async (input: InputDeleteAccountDTO): Promise<OutputDeleteAccountDTO> => {
        
        const {id, token} = input

        const tokenIsValid = this.tokenManager.validateToken(token)

        if(!tokenIsValid){
            throw new BadRequestError("Token inválido, renove seu token refazendo o login.")
        }

        const account = await this.userDatabase.findUserById(id)

        if(!account){
            throw new NotFoundError("O id informado não existe, verifique e tente novamente.")
        }

        if(tokenIsValid.role === USER_ROLES.NORMAL && tokenIsValid.id !== id){
            throw new BadRequestError("Sua conta não possui os privelégios para deletar esta conta.")
        }

        if(tokenIsValid.role === USER_ROLES.ADMIN && (account.role === USER_ROLES.ADMIN || account.role === USER_ROLES.MASTER) && tokenIsValid.id !== id){
            throw new BadRequestError("Um usuário admin não pode excluir outra conta admin ou a conta master.")
        }

        await this.userDatabase.deleteAccount(id)

        return {
            message: "Conta deletada com sucesso!"
        }
    }
}

export interface UserBusinessI {
    signup(input: InputSignupDTO): Promise<OutputSignupDTO>
    login(input: InputLoginDTO): Promise<OutputLoginDTO>
    editAccount(input: InputEditAccountDTO): Promise<OutputEditAccountDTO>
    deleteAccount(input: InputDeleteAccountDTO): Promise<OutputDeleteAccountDTO>
}