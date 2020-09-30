import React from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import AcionistaList from "./AcionistaList.js";
import acionistaService from "src/App/services/Acionista/AcionistaService.js";
import Breadcrumb from 'src/App/layout/AdminLayout/Breadcrumb/index.js';
import ViewPaginadaComponent from 'src/App/components/Views/ViewPaginadaComponent.js';

class AcionistaView extends ViewPaginadaComponent {

  state = {
    resourceAtivos: [],
    totalAtivos: 0,
    resourceDesativados: [],
    totalDesativados: 0,
    idxTab: "ativos" 
  };

  componentDidMount() {
  }

  novo = () => {
    this.props.history.push(`/cadastros/acionistas/novo`)
  }

  editar = (acionista) => {
    this.props.history.push(`/cadastros/acionistas/${acionista.id}`)
  }

  ativarDesativar = (acionista, ativar, paginacao) => {
    this.ativarDesativarModel(acionistaService, acionista.id, ativar, paginacao);
  }

  buscarDadosAtivos = async (page, size, order, sortDirect, search) => {
    this.buscarDadosPaginados(acionistaService, page, size, order, sortDirect, true, search);
  }

  buscarDadosDesativados = async (page, size, order, sortDirect, search) => {
    this.buscarDadosPaginados(acionistaService, page, size, order, sortDirect, false, search);
  }

  handleChangeTab = (value) => {
    this.setState({idxTab: value});
  };
  
  render() {
    const { resourceAtivos, resourceDesativados, totalAtivos, totalDesativados, idxTab } = this.state;
    return (
      <React.Fragment>
        <Breadcrumb newResource={this.novo}/>
        <Row>
          <Col>
            <Tabs onSelect={(k) => this.handleChangeTab(k)} defaultActiveKey="ativos">
              <Tab
                eventKey="ativos"
                title={`Ativos`}
              >
                <AcionistaList isDesativados={false} data={resourceAtivos} editar={this.editar} ativarDesativar={this.ativarDesativar} buscarDadosPaginados={this.buscarDadosAtivos} totalRegistros={totalAtivos} idxTabAtiva={idxTab} />
              </Tab>
              <Tab
                eventKey="desativados"
                title={`Desativados`}
              >
                <AcionistaList isDesativados={false} data={resourceDesativados} editar={this.editar} ativarDesativar={this.ativarDesativar} buscarDadosPaginados={this.buscarDadosDesativados} totalRegistros={totalDesativados} idxTabAtiva={idxTab}/>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default AcionistaView;
