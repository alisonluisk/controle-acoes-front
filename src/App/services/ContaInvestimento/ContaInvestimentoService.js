import BaseResourceService from "../BaseResourceService.js"

class ContaInvestimentoService extends BaseResourceService {

    endpoint = 'contas_investimento';

    getAll = async () =>{
        return this.getAll(this.endpoint, null);
    }

    getAllAcionista = async (codigoAcionista) =>{
        let params = [];
        params.push({chave: 'codigoAcionista', valor: codigoAcionista});
        return this.getAll(this.endpoint + '/find_all_acionista', params);
    }

    getAllEmpresa = async (codigoEmpresa) =>{
        let params = [];
        params.push({chave: 'codigoEmpresa', valor: codigoEmpresa});
        return this.getAll(this.endpoint + '/find_all_empresa', params);
    }

    salvar(conta){
        return this.salvarModelo(this.endpoint, conta);
    }

}

const sevice = new ContaInvestimentoService();
export default sevice;