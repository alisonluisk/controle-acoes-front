import React from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import AcionistaList from "./AcionistaList.js";
import acionistaService from "src/App/services/Acionista/AcionistaService.js";
import Breadcrumb from 'src/App/layout/AdminLayout/Breadcrumb/index.js';
import ViewComponent from 'src/App/components/Views/ViewComponent.js';

class AcionistaView extends ViewComponent {

  state = {
    resourceAtivos: [],
    resourceDesativados: [],
    showModal: false
  };

  componentDidMount() {
    this.buscarAtivosDesativados(acionistaService);
  }

  novo = () => {
    this.props.history.push(`/cadastros/acionistas/novo`)
  }

  editar = (acionista) => {
    this.props.history.push(`/cadastros/acionistas/${acionista.id}`)
  }

  ativarDesativar = (acionista, ativar) => {
    this.ativarDesativarModel(acionistaService, acionista, ativar);
  }

  salvar = async (acionista) => {
    await this.salvarModel(acionistaService, acionista);
  }
  
  render() {
    const { resourceAtivos, resourceDesativados } = this.state;
    return (
      <React.Fragment>
        <Breadcrumb newResource={this.novo}/>
        <Row>
          <Col>
            <Tabs defaultActiveKey="ativos">
              <Tab
                eventKey="ativos"
                title={`Ativos (${resourceAtivos.length})`}
              >
                <AcionistaList isDesativados={false} data={resourceAtivos} ativarDesativar={this.ativarDesativar} editar={this.editar} />
              </Tab>
              <Tab
                eventKey="desativados"
                title={`Desativados (${resourceDesativados.length})`}
              >
                <AcionistaList isDesativados={true} data={resourceDesativados} ativarDesativar={this.ativarDesativar} editar={this.editar}/>
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

export default AcionistaView;
