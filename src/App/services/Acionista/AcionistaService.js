import BaseResourceService from "../BaseResourceService.js"

class AcionistaService extends BaseResourceService {

    endpoint = 'acionistas';

    getAllAtivos = async () =>{
        let params = [];
        params.push({chave: 'ativo', valor: true});
        return this.getAll(this.endpoint, params);
    }

    getAllDesativados(){
        let params = [];
        params.push({chave: 'ativo', valor: false});
        return this.getAll(this.endpoint, params);
    }

    getAllByParams = async (params) =>{
        params.push({chave: 'ativo', valor: true});
        return this.getAll(this.endpoint, params);
    }   

    getAllByParamsPageable = async (params) =>{
        return this.getAll(this.endpoint + '/pageable', params);
    }

    salvar(acionista){
        return this.salvarModelo(this.endpoint, acionista);
    }

    getByCodigo = async (id) => {
        return this.findModelo(this.endpoint, id);
    }

    ativarDesativar(id, ativo){
        return this.update(this.endpoint +`/${id}/set_ativo`, ativo);
    }

}

const sevice = new AcionistaService();
export default sevice;