import BaseResourceService from "../BaseResourceService.js"

class EmpresaService extends BaseResourceService {

    endpoint = 'empresas';

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

    buscarCnpj = async (cnpj) => {
        return this.get(this.endpoint + `/${cnpj}/consultar`);
    }

    getParametroEmpresa = async (id) => {
        return this.get(this.endpoint + `/${id}/parametro_empresa`);
    }

    salvarParametroEmpresa = async (id, data) => {
        return this.update(this.endpoint + `/${id}/parametro_empresa`, data);
    }
}

const sevice = new EmpresaService();
export default sevice;