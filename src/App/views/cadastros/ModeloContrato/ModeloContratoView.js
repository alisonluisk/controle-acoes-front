import React from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import ModeloContratoList from "./ModeloContratoList.js";
import modeloService from "src/App/services/ModeloContrato/ModeloContratoService.js";
import Breadcrumb from 'src/App/layout/AdminLayout/Breadcrumb/index.js';
import ViewComponent from 'src/App/components/Views/ViewComponent.js';
import ParametroEmpresa from "src/App/models/Empresa/ParametroEmpresa.js";
import IconButton from '@material-ui/core/IconButton';
import messageService from "src/App/services/MessageService.js";

class ModeloContratoView extends ViewComponent {

  state = {
    resourceAtivos: [],
    resourceDesativados: []
  };

  componentDidMount() {
    this.buscarAtivosDesativados(modeloService);
  }

  novo = () => {
    this.props.history.push(`/cadastros/modelos_contrato/novo`)
  }

  editar = (modeolo) => {
    this.props.history.push(`/cadastros/modelos_contrato/${modeolo.id}`)
  }

  salvar = async (empresa) => {
    await this.salvarModel(modeloService, empresa);
  }

  render() {
    const { resourceAtivos, resourceDesativados } = this.state;
    return (
      <React.Fragment>
        <Breadcrumb />
        <Row>
          <Col>
            <Tabs defaultActiveKey="ativos">
              <Tab
                eventKey="ativos"
                title={`Ativos`}
              >
                <ModeloContratoList isDesativados={false} data={resourceAtivos} editar={this.editar}/>
              </Tab>
              <Tab
                eventKey="desativados"
                title={`Desativados`}
              >
                <ModeloContratoList isDesativados={true} data={resourceDesativados}/>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default ModeloContratoView;
