import React from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import EmpresaList from "./EmpresaList.js";
import empresaService from "src/App/services/Empresa/EmpresaService.js";
import Breadcrumb from 'src/App/layout/AdminLayout/Breadcrumb/index.js';
import ViewComponent from 'src/App/components/Views/ViewComponent.js';
import ParametroEmpresaModal from "./components/ParametroEmpresaModal.js";
import ParametroEmpresa from "src/App/models/Empresa/ParametroEmpresa.js";
import IconButton from '@material-ui/core/IconButton';
import messageService from "src/App/services/MessageService.js";

class EmpresaView extends ViewComponent {

  state = {
    resourceAtivos: [],
    resourceDesativados: [],
    parametroEmpresa: new ParametroEmpresa({}),
    showModal: false,
    empresa: undefined
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

  editarParametroEmpresa = (empresa) => {
    this.setState({empresa: Object.assign({}, empresa)});

    empresaService.getParametroEmpresa(empresa.id).then((response) => {  
      if(response.data.id){
        this.setState({parametroEmpresa: Object.assign({}, response.data)});
      }else this.setState({parametroEmpresa: Object.assign({}, new ParametroEmpresa({}))});
      this.openCloseModal(true);
    })
  }

  openCloseModal = (value) => {
    this.setState({showModal: value});
  }

  salvarParametroEmpresa = async (parametro) => {
    await empresaService.salvarParametroEmpresa(this.state.empresa.id, parametro)
    .then((data) => {
      messageService.successMessage("Sucesso", "Parâmetro salvo com sucesso");
      this.openCloseModal(false);
    })
    .catch((error) => {
      if (error && error.data) {
        messageService.errorMessage(error.data.error, error.data.message);
      }
    });
  }

  botoesAbaAtivos(row){
    return (
      <React.Fragment>
        <IconButton color="primary" title="Editar" component="span" onClick={(e) => this.editar(row)}>
          <i className="feather icon-edit" style={{fontSize: 19}}/>
        </IconButton>
        {row.tipoEmpresa !== 'FILIAL' && (
          <IconButton color="primary" title="Parâmetros" component="span" onClick={(e) => this.editarParametroEmpresa(row)}>
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
    const { resourceAtivos, resourceDesativados, showModal, parametroEmpresa, empresa } = this.state;
    console.log(resourceAtivos)
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
                <EmpresaList isDesativados={false} data={resourceAtivos} botoes={this.botoesAbaAtivos} ativarDesativar={this.ativarDesativar} editar={this.editar} editarParametroEmpresa={this.editarParametroEmpresa}/>
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

        <ParametroEmpresaModal
          parametroEmpresa={parametroEmpresa}
          empresa={empresa}
          showModal={showModal} 
          closeModal={(e) =>this.openCloseModal(false)}
          salvar={this.salvarParametroEmpresa}
        />
      </React.Fragment>
    );
  }
}

export default EmpresaView;
