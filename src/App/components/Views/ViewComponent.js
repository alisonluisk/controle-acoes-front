import { Component } from "react";
import messageService from "src/App/services/MessageService.js";

class ViewComponent extends Component {

  buscarAtivosDesativados(service) {
    this.buscarAtivados(service);
    this.buscarDesativados(service)
  }

  buscarAtivados(service){
    service
      .getAllAtivos()
      .then((data) => {
        this.setState({ resourceAtivos: data });
      })
      .catch((error) => {
        if(error && error.data){
          messageService.errorMessage(error.data.error, error.data.message);
        }
        this.setState({ resourceAtivos: [] });
      });
  }

  buscarDesativados(service){
    service
    .getAllDesativados()
    .then((data) => {
      this.setState({ resourceDesativados: data });
    })
    .catch((error) => {
      this.setState({ resourceDesativados: [] });
      if(error && error.data){
        messageService.errorMessage(error.data.error, error.data.message);
      }
    });
  }

  setAtivo = (service, model, ativar) => {
    service.ativarDesativar(model.id, ativar).then((data) => {
      messageService.successMessage("Sucesso", `Registro ${ativar? 'ativado' : 'desativado'} com sucesso!`);
      if(ativar){
        let resourceDesativados = [...this.state.resourceDesativados];
        const index = resourceDesativados.findIndex(element => element.id === model.id);
        resourceDesativados.splice(index, 1);
        this.setState(prevState => ({
          resourceAtivos: [...prevState.resourceAtivos, model],
          resourceDesativados: resourceDesativados
        }));
      }else{
        let resourceAtivos = [...this.state.resourceAtivos];
        const index = resourceAtivos.findIndex(element => element.id === model.id);
        resourceAtivos.splice(index, 1);
        this.setState(prevState => ({
          resourceDesativados: [...prevState.resourceDesativados, model],
          resourceAtivos: resourceAtivos
        }));
      }
    })
    .catch((error) => {
      if(error && error.data){
        messageService.errorMessage(error.data.error, error.data.message);
      }
    });
  }

  ativarDesativarModel = (service, model, ativar) => {
    model.ativo = ativar;
    service.salvar(model).then((data) => {
      if(ativar){
        messageService.successMessage("Sucesso", "Registro ativado com sucesso!");
        let resourceDesativados = [...this.state.resourceDesativados];
        const index = resourceDesativados.findIndex(element => element.codigo === model.codigo);
        resourceDesativados.splice(index, 1);
        this.setState(prevState => ({
          resourceAtivos: [...prevState.resourceAtivos, model],
          resourceDesativados: resourceDesativados
        }));
      }else{
        messageService.successMessage("Sucesso", "Registro desativado com sucesso!");
        let resourceAtivos = [...this.state.resourceAtivos];
        const index = resourceAtivos.findIndex(element => element.codigo === model.codigo);
        resourceAtivos.splice(index, 1);
        this.setState(prevState => ({
          resourceDesativados: [...prevState.resourceDesativados, model],
          resourceAtivos: resourceAtivos
        }));
      }
    })
    .catch((error) => {
      if(error && error.data){
        messageService.errorMessage(error.data.error, error.data.message);
      }
    });
  }

  salvarModel = (service, model) => {
    return new Promise((resolve, reject) => {
      service.salvar(model).then((data) => {
        if(model.id){
          messageService.successMessage("Sucesso", "Registro alterado com sucesso!");
          this.joinModelToResourceAtivos(data);
          resolve(data);
        } else{
          messageService.successMessage("Sucesso", "Novo registro cadastrado com sucesso!");
          this.setState(prevState => ({
            resourceAtivos: [...prevState.resourceAtivos, data]
          }));
          resolve(data);
        }
      })
      .catch((error) => {
        if(error && error.data){
          if(error.data.errors)
            messageService.errorMessage(error.data.error, error.data.errors[0].message);
          else messageService.errorMessage(error.data.error, error.data.message);
          
          reject(error);
        }
      });
    });
  }

  getByCodigo = (service, codigo) => {
    return new Promise((resolve, reject) => {
      service.getByCodigo(codigo).then((data) => {
        resolve(data);
      })
      .catch((error) => {
        if(error && error.data){
          if(error.data.errors)
            messageService.errorMessage(error.data.error, error.data.errors[0].message);
          else messageService.errorMessage(error.data.error, error.data.message);
          
          reject(error);
        }
      });
    });
  }

  joinModelToResourceAtivos = (model) => {
    let resourceAtivos = [...this.state.resourceAtivos];
    const index = resourceAtivos.findIndex(element => element.codigo === model.codigo);
    resourceAtivos[index] = model;
    this.setState({ resourceAtivos: resourceAtivos });
  }

}

export default ViewComponent;
