import React from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import UsuarioList from "./UsuarioList.js";
import usuarioService from "src/App/services/Usuario/UsuarioService.js";
import perfilService from "src/App/services/Usuario/PerfilUsuarioService.js";
import Breadcrumb from 'src/App/layout/AdminLayout/Breadcrumb/index.js';
import ViewComponent from 'src/App/components/Views/ViewComponent.js';
import UsuarioModal from "./UsuarioModal.js";

class UsuarioView extends ViewComponent {

  state = {
    resourceAtivos: [],
    resourceDesativados: [],
    showModal: false,
    usuario: undefined,
    perfis: []
  };

  componentDidMount() {
    this.buscarAtivosDesativados(usuarioService);
    perfilService.getAllAtivos().then(response =>{
      this.setState({perfis: response});
    });
  }

  editar = (usuario) => {
    this.setState({usuario: Object.assign({}, usuario)});
    this.openCloseModal(true);
  }

  ativarDesativar = (usuario, ativar) => {
    this.ativarDesativarModel(usuarioService, usuario, ativar);
  }

  salvar = async (usuario) => {
    await this.salvarModel(usuarioService, usuario);
    this.openCloseModal(false);
  }

  openCloseModal = (value) => {
    this.setState({showModal: value});
  }
  
  render() {
    const { resourceAtivos, resourceDesativados, showModal, usuario, perfis } = this.state;
    return (
      <React.Fragment>
        <Breadcrumb/>
        <Row>
          <Col>
            <Tabs defaultActiveKey="ativos">
              <Tab
                eventKey="ativos"
                title={`Ativos (${resourceAtivos.length})`}
              >
                <UsuarioList isDesativados={false} data={resourceAtivos} ativarDesativar={this.ativarDesativar} editar={this.editar} />
              </Tab>
              <Tab
                eventKey="desativados"
                title={`Desativados (${resourceDesativados.length})`}
              >
                <UsuarioList isDesativados={true} data={resourceDesativados} ativarDesativar={this.ativarDesativar} editar={this.editar}/>
              </Tab>
            </Tabs>
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
