import { Box, Grid, IconButton } from "@material-ui/core";
import React, { Component } from "react";
import CustomTableWithoutFilter from "src/App/components/Tables/CustomTableWithoutFilter";
import ContaInvestimento from "src/App/models/ContaInvestimento/ContaInvestimento";
import { maskTipoContrato, maskFormaPagamento, maskNumericValue } from "src/App/utils/formatterHelper";
import ContaInvestimentoModal from "../../ContaInvestimento/ContaInvestimentoModal";
import contaInvestimentoService from "src/App/services/ContaInvestimento/ContaInvestimentoService";
import messageService from "src/App/services/MessageService";

const columns = [
    {
      id: 'tipoContrato',
      label: 'Tipo',
      width: '20%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
      mask: maskTipoContrato
    },
    {
      id: 'integralizacao',
      label: 'Forma de pagamento',
      width: '20%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
      mask: maskFormaPagamento
    },
    {
      id: 'qtdLotes',
      label: 'Qtd. lotes',
      width: '15%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left'
    },

    {
      id: 'aporteTotal',
      label: 'Valor',
      width: '15%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
      mask: maskNumericValue
    },
    {
      id: 'acoes',
      label: 'Ações',
      width: '10%',
      sort: false,
      filter: false,
      disablePadding: false,
      align: 'left',
      isAction: true
    }
  ]

class ContaInvestimentoList extends Component {
  state = {
    showModalContaInvestimento: false,
    contas: [],
    contaInvestimento: undefined
  };

  componentDidMount() {
    if(this.props.acionista){
      this.buscarDadosContas();
    }
  }

  buscarDadosContas = () =>{
    contaInvestimentoService
      .getAllAcionista(this.props.acionista.id)
      .then((data) => {
        this.setState({ contas: data });
      })
      .catch((error) => {
        this.setState({ contas: [] });
        if (error && error.data) {
          messageService.errorMessage(error.data.error, error.data.message);
        }
      });
  }

  cadastrarContaInvestimento = (acionista) => {
    this.setState({showModalContaInvestimento: true, contaInvestimento: new ContaInvestimento({"acionista": acionista})});
  }

  visualizar = (conta) =>{
    this.setState({showModalContaInvestimento: true, contaInvestimento: new ContaInvestimento(conta)});
  }

  botoes(row){
    return (
      <React.Fragment>
        <IconButton color="primary" title="Visualizar" component="span" onClick={(e) => this.visualizar(row)}>
          <i className="feather icon-airplay" style={{fontSize: 19}}/>
        </IconButton>
      </React.Fragment>
    );
  }
  
  render() {
    const { acionista } = this.props;
    const { showModalContaInvestimento, contas, contaInvestimento } = this.state;

    return (
      <React.Fragment>
        <Box width="100%" display="flex" flexDirection="column">
          <Grid container style={{ paddingBottom: "7px" }} spacing={1}>
            <Grid item xs={12} sm={4}>
              <IconButton
                color="primary"
                title="Nova conta de investimento"
                component="span"
                type="button"
                style={{ paddingLeft: 20, paddingTop: 20 }}
                onClick={(e)=> this.cadastrarContaInvestimento(acionista)}
              >
                <i className="feather icon-plus-square" style={{ fontSize: 20 }} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container style={{ paddingBottom: "7px" }} spacing={1}>
            <Grid item xs={12}>
              <CustomTableWithoutFilter
                {...this.props}
                visualizar={this.visualizar}
                columns={columns}
                data={contas}
                botoes={this.botoes}
              />
            </Grid>
          </Grid>
        </Box>
  
        <ContaInvestimentoModal 
          contaInvestimento={contaInvestimento}
          showModal={showModalContaInvestimento} 
          closeModal={(e) => {
            this.setState({showModalContaInvestimento: false, contaInvestimento: undefined});
            this.buscarDadosContas();
          }}
            />
      </React.Fragment>
    );
  }
  
};

export default ContaInvestimentoList;