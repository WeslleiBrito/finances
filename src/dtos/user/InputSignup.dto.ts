import z from "zod"

export interface InputSignupDTO {
    name: string,
    lastName: string,
    cpfCnpj: string,
    country: string,
    district: string,
    state: string,
    city: string,
    road: string,
    houseNumber: string,
    foneNumber: string,
    email: string,
    password: string
}

export interface OutputSignupDTO {
    message: string,
    token: string
}

export const InputSignupSchema = z.object(
    {
        name: z.string({required_error: "Nome não informado.",  invalid_type_error: "Espera-se que o name venha como string."})
        .min(3, {message: "O nome precisa ter pelo menos 3 caracteres."}),
        lastName: z.string({required_error: "O sobrenome é obrigatório", invalid_type_error: "O sobrenome deve ser uma string"})
        .min(3, {message: "O sobrenome precisa ter pelo menos 3 caracteres."}),
        cpfCnpj: z.string({required_error: "CPF ou CNPJ não foi informado", invalid_type_error: "O CPF ou CNPJ deve ser uma string"})
        .regex(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/, {message: "CPF ou CNPJ inválido."}),
        country: z.string({required_error: "País não informado.",  invalid_type_error: "Espera-se que o país venha como string."})
        .min(3, {message: "O país precisa ter pelo menos 3 caracteres."}),
        state: z.string({required_error: "Estado não informado.",  invalid_type_error: "Espera-se que o estado venha como string."})
        .min(3, {message: "O estado precisa ter pelo menos 3 caracteres."}),
        city: z.string({required_error: "Cidade não informado.",  invalid_type_error: "Espera-se que a cidade venha como string."})
        .min(3, {message: "A cidade precisa ter pelo menos 3 caracteres."}),
        district: z.string({required_error: "Bairro não informado.",  invalid_type_error: "Espera-se que a bairro venha como string."})
        .min(3, {message: "O bairro precisa ter pelo menos 3 caracteres."}),
        road: z.string({required_error: "Rua não informado.",  invalid_type_error: "Espera-se que a rua venha como string."})
        .min(3, {message: "O nome da rua precisa ter pelo menos 3 caracteres."}),
        houseNumber: z.string({required_error: "Número do imovél não informado.",  invalid_type_error: "Espera-se que o número do imóvel venha como string."})
        .min(3, {message: "O número do imóvel do precisa ter pelo menos 3 caracteres."}),
        foneNumber: z.string({required_error: "Número do celular não informado.",  invalid_type_error: "Espera-se que o número do celular venha como string."})
        .min(11, {message: "O número do telefone precisa ter pelo menos 11 caracteres."}),
        email: z.string({required_error: "Email não informado.",  invalid_type_error: "Espera-se que o email venha como string."})
        .email({message: "Email inválido."}),
        password: z.string({required_error: "Password não informado.",  invalid_type_error: "Espera-se que o password venha como string."})
        .min(5, {message: "O password precisa ter pelo menos 5 caracteres."})
    }
).transform(data => data as InputSignupDTO)

