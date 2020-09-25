import BaseResourceService from "../BaseResourceService.js"

class MunicipioService extends BaseResourceService {

    endpoint = 'municipios';

    findAllByNome = async (nome) =>{
        let params = [];
        params.push({chave: 'nome', valor: nome});
        return this.getAll(this.endpoint + '/find_all_by_nome', params);
    }   

}

const sevice = new MunicipioService();
export default sevice;