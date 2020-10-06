import React from "react";
import { Row, Col } from "react-bootstrap";
import UsuarioList from "./UsuarioList.js";
import usuarioService from "src/App/services/Usuario/UsuarioService.js";
import perfilService from "src/App/services/Usuario/PerfilUsuarioService.js";
import Breadcrumb from 'src/App/layout/AdminLayout/Breadcrumb/index.js';
import ViewComponent from 'src/App/components/Views/ViewComponent.js';
import UsuarioModal from "./UsuarioModal.js";
import { IconButton } from "@material-ui/core";
import DefinirSenhaModal from "./dialogs/DefinirSenhaModal.js";

class UsuarioView extends ViewComponent {

  state = {
    resourceAtivos: [],
    showModal: false,
    showDefinirSenha: false,
    usuario: undefined,
    perfis: []
  };

  componentDidMount() {
    this.buscarAtivados(usuarioService);
    perfilService.getAllAtivos().then(response =>{
      this.setState({perfis: response});
    });
  }

  editar = (usuario) => {
    this.setState({usuario: Object.assign({}, usuario)});
    this.openCloseModal(true);
  }

  salvar = async (usuario) => {
    await this.salvarModel(usuarioService, usuario);
    this.openCloseModal(false);
  }

  openCloseModal = (value) => {
    this.setState({showModal: value});
  }

  openCloseModalDefinirSenha = (value) => {
    this.setState({showDefinirSenha: value});
  }


  openDefinirSenha = (usuario) => {
    this.setState({usuario: Object.assign({}, usuario)});
    this.openCloseModalDefinirSenha(true);
  }

  definirSenha = async (usuario) => {
    usuarioService.definirSenha(usuario).then(data=>{
      console.log(data)
      //FECHAR MODAL E RECARREGAR USUARIOS
    })
  }

  botoesAbaAtivos(row){
    return (
      <React.Fragment>
        <IconButton color="primary" title="Editar" component="span" onClick={(e) => this.editar(row)}>
          <i className="feather icon-edit" style={{fontSize: 19}}/>
        </IconButton>
        {row.senhaConfigurada === false && (
          <IconButton color="primary" title="Definir senha" component="span" onClick={(e) => this.openDefinirSenha(row)}>
            <i className="feather icon-settings" style={{fontSize: 19}}/>
          </IconButton>
        )}
        <IconButton color="secondary" aria-label="upload picture" title="Desativar" component="span" onClick={(e) => this.ativarDesativar(row, false)}>
            <i className="feather icon-trash-2" style={{fontSize: 19}}/>
          </IconButton>
      </React.Fragment>
    );
  }
  
  render() {
    const { resourceAtivos, showModal, showDefinirSenha, usuario, perfis } = this.state;
    return (
      <React.Fragment>
        <Breadcrumb/>
        <Row>
          <Col>
            <UsuarioList isDesativados={false} botoes={this.botoesAbaAtivos} data={resourceAtivos} openDefinirSenha={this.openDefinirSenha}  editar={this.editar} />
          </Col>
        </Row>

        <UsuarioModal
          usuario={usuario}
          showModal={showModal} 
          perfis={perfis}
          closeModal={(e) =>this.openCloseModal(false)}
          salvar={this.salvar}
        />

        <DefinirSenhaModal
          usuario={usuario}
          showModal={showDefinirSenha} 
          closeModal={(e) =>this.openCloseModalDefinirSenha(false)}
          salvar={this.definirSenha}
        />
      </React.Fragment>
    );
  }
}

export default UsuarioView;
