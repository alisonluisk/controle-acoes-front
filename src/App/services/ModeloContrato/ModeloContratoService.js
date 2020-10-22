import BaseResourceService from "../BaseResourceService.js"

class ModeloContratoService extends BaseResourceService {

    endpoint = 'modelos_contrato';

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

    salvar(empresa){
        return this.salvarModelo(this.endpoint, empresa);
    }

    getByCodigo = async (id) => {
        return this.findModelo(this.endpoint, id);
    }

}

const sevice = new ModeloContratoService();
export default sevice;