import BaseResourceService from "../BaseResourceService.js"

class CepService extends BaseResourceService {

    endpoint = 'cep';

    getByCodigo = async (id) => {
        return this.findModelo(this.endpoint, id);
    }

}

const sevice = new CepService();
export default sevice;