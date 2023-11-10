import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { InputSignupSchema, OutputSignupDTO } from "../dtos/user/InputSignup.dto";
import { InputLoginSchema } from "../dtos/user/InputLogin.dto";
import { InputEditAccountSchema } from "../dtos/user/InputEditAccount.dto";
import { InputDeleteAccountSchema } from "../dtos/user/InputDeleteAccount.dto";
import {AxiosError} from 'axios'
import { InputCompleteRegistrationSchema, OutputCompleteRegistrationDTO } from "../dtos/user/CompleteRegistration.dto";

export class UserController {

    constructor(
        private userBusiness: UserBusiness
    ) { }

    public signup = async (req: Request, res: Response) => {

        try {
            const { name,
                lastName,
                cpfCnpj,
                addresses,
                phoneNumber,
                email,
                password
            } = req.body

            const input = InputSignupSchema.parse(
                {
                    name,
                    lastName,
                    cpfCnpj,
                    addresses,
                    phoneNumber,
                    email,
                    password
                }
            )

            const output: OutputSignupDTO = await this.userBusiness.signup(input)

            res.status(201).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
                console.log(error);
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado\n " + error)
                
            }
        }

    }
    public findAllUser = async (req: Request, res: Response) => {

        try {
        

            const output = await this.userBusiness.findAllUser()

            res.status(201).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado\n " + error)
                
            }
        }

    }

    public completeRegistrationUser = async (req: Request, res: Response) => {

        try {
            const { 
                lastName,
                cpfCnpj,
                addresses,
                phoneNumber
            } = req.body

            const input = InputCompleteRegistrationSchema.parse(
                {
                    id: req.params.id,
                    lastName,
                    cpfCnpj,
                    addresses,
                    phoneNumber
                }
            )

            const output: OutputCompleteRegistrationDTO = await this.userBusiness.completeRegistrationUser(input)

            res.status(201).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
                console.log(error);
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else if (error instanceof AxiosError) {
                res.status(404).send("CEP inválido!")
            }else {
                res.send("Erro inesperado\n " + error)
                
            }
        }

    }

    public login = async (req: Request, res: Response) => {
        try {
            const input = InputLoginSchema.parse(
                {
                    email: req.body.email,
                    password: req.body.password
                }
            )

            const output = await this.userBusiness.login(input)

            res.status(200).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado\n " + error)
            }
        }
    }

    public editAccount = async (req: Request, res: Response) => {
        try {

            const {
                name,
                lastName,
                cpfCnpj,
                country,
                state,
                city,
                district,
                road,
                houseNumber,
                foneNumber,
            } = req.body
            
            const input = InputEditAccountSchema.parse(
                {
                    token: req.headers.authorization,
                    id: req.params.id,
                    password: req.body.password,
                    name,
                    lastName,
                    cpfCnpj,
                    country,
                    state,
                    city,
                    district,
                    road,
                    houseNumber,
                    foneNumber
                }
            )

            const output = await this.userBusiness.editAccount(input)

            res.status(200).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else if (error instanceof AxiosError) {
                res.status(404).send("CEP inválido!")
            }else {
                res.send("Erro inesperado\n " + error)
            }
        }
    }

    public deleteAccount = async (req: Request, res: Response) => {
        try {
            const input = InputDeleteAccountSchema.parse(
                {
                    token: req.headers.authorization,
                    id: req.params.id
                }
            )

            const output = await this.userBusiness.deleteAccount(input)

            res.status(200).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado\n " + error)
            }
        }
    }
}