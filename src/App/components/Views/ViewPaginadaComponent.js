import { Component } from "react";
import messageService from "src/App/services/MessageService.js";

class ViewPaginadaComponent extends Component {

  buscarDadosPaginados = async (service, page, size, order, sortDirect, ativo, search) => {
    let params = [];
    params.push({chave: 'page', valor: page});
    params.push({chave: 'size', valor: size});
    params.push({chave: 'sortColumn', valor: order});
    params.push({chave: 'sortDirection', valor: sortDirect});
    params.push({chave: 'ativo', valor: ativo});
    params.push({chave: 'search', valor: search })
    service.getAllByParamsPageable(params).then(response =>{
      if(ativo){
        this.setState({resourceAtivos: response.content, totalAtivos: response.totalElements});
      }else{
        this.setState({resourceDesativados: response.content, totalDesativados: response.totalElements});
      }
    })
    .catch((error) => {
      if(error && error.data){
        messageService.errorMessage(error.data.error, error.data.message);
      }
    });
  }

  buscarDadosAtivosDesativados = async (service, ativar, paginacao) => {
    const {page, rowsPerPage, order, orderBy, filtro} = paginacao;
    this.buscarDadosPaginados(service, page, rowsPerPage, orderBy, order, !ativar, filtro);
  }

  ativarDesativarModel = (service, codigo, ativar, paginacao) => {
    service.ativarDesativar(codigo, ativar).then((data) => {
      messageService.successMessage("Sucesso", `Registro ${ativar? 'ativado' : 'desativado'} com sucesso!`);
      if(paginacao){
        this.buscarDadosAtivosDesativados(service, ativar, paginacao);
      }
    })
    .catch((error) => {
      if(error && error.data){
        messageService.errorMessage(error.data.error, error.data.message);
      }
    });
  }

}

export default ViewPaginadaComponent;
