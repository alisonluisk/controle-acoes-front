import React from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import AcionistaList from "./AcionistaList.js";
import acionistaService from "src/App/services/Acionista/AcionistaService.js";
import Breadcrumb from 'src/App/layout/AdminLayout/Breadcrumb/index.js';
import ViewPaginadaComponent from 'src/App/components/Views/ViewPaginadaComponent.js';
import ContaInvestimentoModal from "../ContaInvestimento/ContaInvestimentoModal.js";
import { IconButton } from "@material-ui/core";
import ContaInvestimento from "src/App/models/ContaInvestimento/ContaInvestimento";

class AcionistaView extends ViewPaginadaComponent {

  state = {
    resourceAtivos: [],
    totalAtivos: 0,
    resourceDesativados: [],
    totalDesativados: 0,
    idxTab: "ativos" ,
    showModalContaInvestimento: false,
    acionista: undefined
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


  cadastrarContaInvestimento = (acionista) => {
    this.setState({acionista: Object.assign({}, acionista), showModalContaInvestimento: true});

  }

  handleChangeTab = (value) => {
    this.setState({idxTab: value});
  };

  botoesAbaAtivos(row){
    return (
      <React.Fragment>
        <IconButton color="primary" title="Editar" component="span" onClick={(e) => this.editar(row)}>
          <i className="feather icon-edit" style={{fontSize: 19}}/>
        </IconButton>
        <IconButton color="primary" title="Cadastrar conta investimento" component="span" onClick={(e) => this.cadastrarContaInvestimento(row)}>
            <i className="feather icon-settings" style={{fontSize: 19}}/>
        </IconButton>
        <IconButton color="secondary" aria-label="upload picture" title="Desativar" component="span" onClick={(e) => this.ativarDesativar(row, false)}>
            <i className="feather icon-trash-2" style={{fontSize: 19}}/>
          </IconButton>
      </React.Fragment>
    );
  }


  
  render() {
    const { resourceAtivos, resourceDesativados, totalAtivos, totalDesativados, idxTab, showModalContaInvestimento, acionista } = this.state;
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
                <AcionistaList isDesativados={false} data={resourceAtivos} botoes={this.botoesAbaAtivos} editar={this.editar} cadastrarContaInvestimento={this.cadastrarContaInvestimento} ativarDesativar={this.ativarDesativar} buscarDadosPaginados={this.buscarDadosAtivos} totalRegistros={totalAtivos} idxTabAtiva={idxTab} />
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

        <ContaInvestimentoModal 
          contaInvestimento={new ContaInvestimento({"acionista": acionista})}
          showModal={showModalContaInvestimento} 
          closeModal={(e) => this.setState({acionista: undefined, showModalContaInvestimento: false})}
          />
      </React.Fragment>
    );
  }
}

export default AcionistaView;
