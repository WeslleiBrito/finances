import z from "zod"
import { AddressInputDTO } from "../../types/types";

export interface InputCompleteRegistrationDTO {
    lastName: string,
    cpfCnpj: string,
    addresses: AddressInputDTO[],
    phoneNumber: {number: string}[]
}

export const PhoneNumberSchema = z.object({
    number: z.string({required_error: "Número do celular/telefone não informado.",  invalid_type_error: "Espera-se que o número do celular/telefone venha como string."})
    .regex(/^(?:(?:\+|00)55)?(?:\(\d{2}\)|\d{2})\s?9?\d{4}-?\d{4}$/, {message: "Celular ou telefone inválido"})
  }
)
  
export const AddressSchema = z.object({
    cep: z.string({ required_error: "CEP não informado.", invalid_type_error: "CEP deve ser uma string." })
    .regex(/^\d{5}-?\d{3}$/, {message: "CEP Inválido"}),
    country: z.string({ required_error: "País não informado.", invalid_type_error: "País deve ser uma string." })
    .min(3, { message: "O país precisa ter pelo menos 3 caracteres." }),
    state: z.string({ required_error: "Estado não informado.", invalid_type_error: "Estado deve ser uma string." })
    .min(3, { message: "O estado precisa ter pelo menos 3 caracteres." }),
    city: z.string({ required_error: "Cidade não informada.", invalid_type_error: "Cidade deve ser uma string." })
    .min(3, { message: "A cidade precisa ter pelo menos 3 caracteres." }),
    district: z.string({ required_error: "Bairro não informado.", invalid_type_error: "Bairro deve ser uma string." })
    .min(3, { message: "O bairro precisa ter pelo menos 3 caracteres." }),
    road: z.string({ required_error: "Rua não informada.", invalid_type_error: "Rua deve ser uma string." })
    .min(3, { message: "O nome da rua precisa ter pelo menos 3 caracteres." }),
    houseNumber: z.string({ required_error: "Número do imóvel não informado.", invalid_type_error: "Número do imóvel deve ser uma string." })
    .min(3, { message: "O número do imóvel deve ter pelo menos 3 caracteres." }),
});

export const InputCompleteRegistrationSchema = z.object(
    {
        lastName: z.string({required_error: "O sobrenome é obrigatório", invalid_type_error: "O sobrenome deve ser uma string"})
        .min(3, {message: "O sobrenome precisa ter pelo menos 3 caracteres."}),
        cpfCnpj: z.string({required_error: "CPF ou CNPJ não foi informado", invalid_type_error: "O CPF ou CNPJ deve ser uma string"})
        .regex(/^(\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}|\d{11}|\d{14})$/, {message: "CPF ou CNPJ inválido."}),
        addresses: z.array(AddressSchema),
        phoneNumber: z.array(PhoneNumberSchema)
    }
).transform(data => data as InputCompleteRegistrationDTO)