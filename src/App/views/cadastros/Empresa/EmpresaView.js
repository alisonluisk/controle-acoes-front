import React from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import EmpresaList from "./EmpresaList.js";
import empresaService from "src/App/services/Empresa/EmpresaService.js";
import Breadcrumb from 'src/App/layout/AdminLayout/Breadcrumb/index.js';
import ViewComponent from 'src/App/components/Views/ViewComponent.js';

class EmpresaView extends ViewComponent {

  state = {
    resourceAtivos: [],
    resourceDesativados: []
  };

  componentDidMount() {
    this.buscarAtivosDesativados(empresaService);
  }

  novo = () => {
    this.props.history.push(`/cadastros/empresas/novo`)
  }

  editar = (empresa) => {
    this.props.history.push(`/cadastros/empresas/${empresa.id}`)
  }

  ativarDesativar = (empresa, ativar) => {
    this.ativarDesativarModel(empresaService, empresa, ativar);
  }

  salvar = async (empresa) => {
    await this.salvarModel(empresaService, empresa);
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
                <EmpresaList isDesativados={false} data={resourceAtivos} ativarDesativar={this.ativarDesativar} editar={this.editar} />
              </Tab>
              <Tab
                eventKey="desativados"
                title={`Desativados (${resourceDesativados.length})`}
              >
                <EmpresaList isDesativados={true} data={resourceDesativados} ativarDesativar={this.ativarDesativar} editar={this.editar}/>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default EmpresaView;
