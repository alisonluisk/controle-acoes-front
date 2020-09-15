import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import AcoesList from "./AcoesList.js";
import empresaService from "src/App/services/Empresa/EmpresaService.js";
import Breadcrumb from 'src/App/layout/AdminLayout/Breadcrumb/index.js';
import IconButton from '@material-ui/core/IconButton';
import messageService from "src/App/services/MessageService.js";
import AcoesModal from "./AcoesModal.js";

class AcoesView extends Component {

  state = {
    showModal: false,
    empresas: undefined,
    acoes: {
      empresa: undefined,
      cotasOn: 50,
      cotasPn: 50,
      qtdLotes: 505,
      valorAcao: 1
    }
  };

  componentDidMount() {
    empresaService
      .getAllEmpresasAcoes()
      .then((data) => {
        console.log(data)
        this.setState({ empresas: data });
      })
      .catch((error) => {
        this.setState({ empresas: [] });
        if (error && error.data) {
          messageService.errorMessage(error.data.error, error.data.message);
        }
      });
  }

  gerarAcoes = (empresa) => {
    var acoes = {...this.state.acoes}
    acoes.empresa = empresa;
    this.setState({acoes})
    this.openCloseModal(true);
  }

  salvar = async (empresa) => {
        empresaService
      .gerarAcoes(empresa)
      .then((data) => {
        console.log(data)
        // this.setState({ empresas: data });
      })
      .catch((error) => {
        this.setState({ empresas: [] });
        if (error && error.data) {
          messageService.errorMessage(error.data.error, error.data.message);
        }
      });
    console.log(empresa)
  }

  openCloseModal = (value) => {
    this.setState({showModal: value});
  }

  botoesAbaAtivos(row){
    return (
      <React.Fragment>
          <IconButton color="primary" title="Gerar ações" component="span" onClick={(e) => this.gerarAcoes(row)}>
            <i className="feather icon-settings" style={{fontSize: 19}}/>
          </IconButton>
      </React.Fragment>
    );
  }

  render() {
    const { empresas, acoes, showModal } = this.state;
    return (
      <React.Fragment>
        <Breadcrumb/>
        <Row>
          <Col>
            <AcoesList data={empresas} botoes={this.botoesAbaAtivos} gerarAcoes={this.gerarAcoes} />
          </Col>
        </Row>

        <AcoesModal
          acoes={acoes}
          showModal={showModal} 
          closeModal={(e) =>this.openCloseModal(false)}
          salvar={this.salvar}
        />
      </React.Fragment>
    );
  }
}

export default AcoesView;
