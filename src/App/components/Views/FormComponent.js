import { Component } from "react";
import messageService from "src/App/services/MessageService.js";

class FormComponent extends Component {
  
  salvarModel = (service, model) => {
    return new Promise((resolve, reject) => {
      service.salvar(model).then((data) => {
        if(model.codigo){
          messageService.successMessage("Sucesso", "Registro alterado com sucesso!");
          resolve(data);
        } else{
          messageService.successMessage("Sucesso", "Novo registro cadastrado com sucesso!");
          resolve(data);
        }
      })
      .catch((error) => {
        if(error && error.data){
          if(error.data.errors)
            messageService.errorMessage(error.data.error, error.data.errors[0].message);
          else messageService.errorMessage(error.data.error, error.data.message);
          
          // reject(error);
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

}

export default FormComponent;
