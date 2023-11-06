import z from "zod"

export interface InputEditAccountDTO {
    token: string
    id: string
    name?: string
    password?: string,
    lastName?: string,
    country?: string,
    district?: string,
    state?: string,
    city?: string,
    road?: string,
    houseNumber?: string,
    foneNumber?: string,

}

export interface OutputEditAccountDTO {
    message: string
}

export const InputEditAccountSchema = z.object(
    {
        token: z.string({required_error: "O token é obrigatório.", invalid_type_error: "Espera-se que o token seja uma string"}).min(1, "O token vazio."),
        id: z.string({required_error: "O id é obrigatório.", invalid_type_error: "O id deve ser uma string"}).min(1, "Id vazio"),
        name: z.string({invalid_type_error: "Espera-se que o name venha como string."}).min(3, {message: "O nome precisa ter pelo menos 3 caracteres."}).optional(),
        lastName: z.string({required_error: "O sobrenome é obrigatório", invalid_type_error: "O sobrenome deve ser uma string"})
        .min(3, {message: "O sobrenome precisa ter pelo menos 3 caracteres."}).optional(),
country: z.string({required_error: "País não informado.",  invalid_type_error: "Espera-se que o país venha como string."})
        .min(3, {message: "O país precisa ter pelo menos 3 caracteres."}).optional(),
        state: z.string({required_error: "Estado não informado.",  invalid_type_error: "Espera-se que o estado venha como string."})
        .min(3, {message: "O estado precisa ter pelo menos 3 caracteres."}).optional(),
        city: z.string({required_error: "Cidade não informado.",  invalid_type_error: "Espera-se que a cidade venha como string."})
        .min(3, {message: "A cidade precisa ter pelo menos 3 caracteres."}).optional(),
        district: z.string({required_error: "Bairro não informado.",  invalid_type_error: "Espera-se que a bairro venha como string."})
        .min(3, {message: "O bairro precisa ter pelo menos 3 caracteres."}).optional(),
        road: z.string({required_error: "Rua não informado.",  invalid_type_error: "Espera-se que a rua venha como string."})
        .min(3, {message: "O nome da rua precisa ter pelo menos 3 caracteres."}).optional(),
        houseNumber: z.string({required_error: "Número do imovél não informado.",  invalid_type_error: "Espera-se que o número do imóvel venha como string."})
        .min(3, {message: "O número do imóvel do precisa ter pelo menos 3 caracteres."}).optional(),
        foneNumber: z.string({required_error: "Número do celular não informado.",  invalid_type_error: "Espera-se que o número do celular venha como string."})
        .min(11, {message: "O número do telefone precisa ter pelo menos 11 caracteres."}).optional(),
        password: z.string({invalid_type_error: "Espera-se que o password venha como string."}).min(5, {message: "O password precisa ter pelo menos 5 caracteres."}).optional()
    }
)