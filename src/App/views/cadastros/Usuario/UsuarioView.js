import React from "react";
import { Row, Col } from "react-bootstrap";
import UsuarioList from "./UsuarioList.js";
import usuarioService from "src/App/services/Usuario/UsuarioService.js";
import perfilService from "src/App/services/Usuario/PerfilUsuarioService.js";
import Breadcrumb from 'src/App/layout/AdminLayout/Breadcrumb/index.js';
import ViewComponent from 'src/App/components/Views/ViewComponent.js';
import UsuarioModal from "./UsuarioModal.js";

class UsuarioView extends ViewComponent {

  state = {
    resourceAtivos: [],
    showModal: false,
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
  
  render() {
    const { resourceAtivos, showModal, usuario, perfis } = this.state;
    return (
      <React.Fragment>
        <Breadcrumb/>
        <Row>
          <Col>
            <UsuarioList isDesativados={false} data={resourceAtivos}  editar={this.editar} />
          </Col>
        </Row>

        <UsuarioModal
          usuario={usuario}
          showModal={showModal} 
          perfis={perfis}
          closeModal={(e) =>this.openCloseModal(false)}
          salvar={this.salvar}
        />
      </React.Fragment>
    );
  }
}

export default UsuarioView;
