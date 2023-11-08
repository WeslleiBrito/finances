import axios from "axios";

export class SearchCEP {

    public getCep = async (cep: string) => {
        try {
            return await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)
        } catch (error) {
            console.log(error)
        }
    }
}