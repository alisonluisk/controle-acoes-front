import React from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import UsuarioList from "./UsuarioList.js";
import usuarioService from "src/App/services/Usuario/UsuarioService.js";
import Breadcrumb from 'src/App/layout/AdminLayout/Breadcrumb/index.js';
import ViewComponent from 'src/App/components/Views/ViewComponent.js';

class UsuarioView extends ViewComponent {

  state = {
    resourceAtivos: [],
    resourceDesativados: [],
    showModal: false
  };

  componentDidMount() {
    this.buscarAtivosDesativados(usuarioService);
  }

  editar = (usuario) => {
    this.props.history.push(`/cadastros/usuarios/${usuario.id}`)
  }

  ativarDesativar = (usuario, ativar) => {
    this.ativarDesativarModel(usuarioService, usuario, ativar);
  }

  salvar = async (usuario) => {
    await this.salvarModel(usuarioService, usuario);
  }
  
  render() {
    const { resourceAtivos, resourceDesativados } = this.state;
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

        {/* <ParametroEmpresaModal
          parametroEmpresa={parametroEmpresa}
          empresa={empresa}
          showModal={showModal} 
          closeModal={(e) =>this.openCloseModal(false)}
          salvar={this.salvarParametroEmpresa}
        /> */}
      </React.Fragment>
    );
  }
}

export default UsuarioView;
