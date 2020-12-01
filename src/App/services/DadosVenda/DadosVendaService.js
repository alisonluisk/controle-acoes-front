import BaseResourceService from "../BaseResourceService.js"

class DadosVendaService extends BaseResourceService {

    endpoint = 'dados_venda';

    findAll = async () =>{
        return this.getAll(this.endpoint, null);
    }

    getAllAcionistaCompetencia = async (codigoAcionista, competencia) =>{
        let params = [];
        params.push({chave: 'codigoAcionista', valor: codigoAcionista});
        params.push({chave: 'competencia', valor: competencia});
        return this.getAll(this.endpoint + '/find_by_params', params);
    }

}

const sevice = new DadosVendaService();
export default sevice;