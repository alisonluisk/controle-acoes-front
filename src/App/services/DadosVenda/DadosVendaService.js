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

    // getAllEmpresa = async (codigoEmpresa) =>{
    //     let params = [];
    //     params.push({chave: 'codigoEmpresa', valor: codigoEmpresa});
    //     return this.getAll(this.endpoint + '/find_all_empresa', params);
    // }

    // salvar(conta){
    //     return this.salvarModelo(this.endpoint, conta);
    // }

}

const sevice = new DadosVendaService();
export default sevice;