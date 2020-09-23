import React from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import ColaboradorList from "./ColaboradorList.js";
import colaboradorService from "src/App/services/Colaborador/ColaboradorService.js";
import Breadcrumb from 'src/App/layout/AdminLayout/Breadcrumb/index.js';
import ViewComponent from 'src/App/components/Views/ViewComponent.js';

class ColaboradorView extends ViewComponent {

  state = {
    resourceAtivos: [],
    resourceDesativados: [],
    showModal: false
  };

  componentDidMount() {
    this.buscarAtivosDesativados(colaboradorService);
  }

  novo = () => {
    this.props.history.push(`/cadastros/colaboradores/novo`)
  }

  editar = (colaborador) => {
    this.props.history.push(`/cadastros/colaboradores/${colaborador.id}`)
  }

  ativarDesativar = (colaborador, ativar) => {
    this.ativarDesativarModel(colaboradorService, colaborador, ativar);
  }

  salvar = async (colaborador) => {
    await this.salvarModel(colaboradorService, colaborador);
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
                <ColaboradorList isDesativados={false} data={resourceAtivos} ativarDesativar={this.ativarDesativar} editar={this.editar} />
              </Tab>
              <Tab
                eventKey="desativados"
                title={`Desativados (${resourceDesativados.length})`}
              >
                <ColaboradorList isDesativados={true} data={resourceDesativados} ativarDesativar={this.ativarDesativar} editar={this.editar}/>
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

export default ColaboradorView;
