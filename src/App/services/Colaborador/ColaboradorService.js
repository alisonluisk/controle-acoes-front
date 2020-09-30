import BaseResourceService from "../BaseResourceService.js"

class ColaboradorService extends BaseResourceService {

    endpoint = 'colaboradores';

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

    salvar(colaborador){
        return this.salvarModelo(this.endpoint, colaborador);
    }

    ativarDesativar(id, ativo){
        return this.update(this.endpoint +`/${id}/set_ativo`, ativo);
    }

    getByCodigo = async (id) => {
        return this.findModelo(this.endpoint, id);
    }

}

const sevice = new ColaboradorService();
export default sevice;