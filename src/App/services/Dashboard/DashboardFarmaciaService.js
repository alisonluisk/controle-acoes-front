import BaseResourceService from "../BaseResourceService.js"

class DashboardFarmaciaService extends BaseResourceService {

    endpoint = 'dashboards_farmacia';

    getLast12Meses = async (codigoEmpresa) =>{
        let params = [];
        params.push({chave: 'codigoEmpresa', valor: codigoEmpresa});
        return this.getAll(this.endpoint + '/get_last_doze_meses', params);
    }

}

const sevice = new DashboardFarmaciaService();
export default sevice;