import axios from "axios";

export class SearchCEP {

    public getCep = async (cep: string) => {
        const search = (await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)).data
    }    
}