import { Box, Grid, IconButton } from "@material-ui/core";
import React, { Component } from "react";
import CustomTableWithoutFilter from "src/App/components/Tables/CustomTableWithoutFilter";
import ContaInvestimento from "src/App/models/ContaInvestimento/ContaInvestimento";
import { maskTipoContrato, stringToDateDataVenda, maskNumericValue, maskCurrency } from "src/App/utils/formatterHelper";
import ContaInvestimentoModal from "../../ContaInvestimento/ContaInvestimentoModal";
import contaInvestimentoService from "src/App/services/ContaInvestimento/ContaInvestimentoService";
import messageService from "src/App/services/MessageService";
import dadosVendaService from "src/App/services/DadosVenda/DadosVendaService"
import MonthField from "src/App/components/TextFields/MonthField";
import moment from "moment";
import TextField from "src/App/components/TextFields/TextField";

const columns = [
    {
      id: 'dataVenda',
      label: 'Data',
      width: '15%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
      mask: stringToDateDataVenda
    },
    {
      id: 'nomeProduto',
      label: 'Produto',
      width: '53%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
    },
    {
      id: 'totalMercado',
      label: 'Vl. mercado',
      width: '12%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
      mask: maskNumericValue
    },
    {
      id: 'totalDesconto',
      label: 'Economia',
      width: '10%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
      mask: maskNumericValue
    },
    {
      id: 'totalVenda',
      label: 'Vl. pago',
      width: '10%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
      mask: maskNumericValue
    }
  ]

class ExtratoMensalList extends Component {
  state = {
    vendas: [],
    compentencia: moment(),
    valorTotal: 0, 
    valorMercado: 0, 
    valorDescontos: 0
  };

  componentDidMount() {
    if(this.props.acionista){
      this.buscarDadosVenda(this.state.compentencia);
    }
  }

  buscarDadosVenda = (competencia) =>{
    dadosVendaService
    .getAllAcionistaCompetencia(this.props.acionista.id, competencia)
    .then((data) => {
      this.setState({ vendas: data });
      this.calcularTotais(data);
    })
    .catch((error) => {
      this.setState({ vendas: [] });
      if (error && error.data) {
        messageService.errorMessage(error.data.error, error.data.message);
      }
    });
  }

  calcularTotais = (data) =>{
    let valorTotal = data.reduce(function(valorTotal, venda){
      return valorTotal + venda.totalVenda;
    }, 0);
    let valorMercado = data.reduce(function(valorMercado, venda){
      return valorMercado + venda.totalMercado;
    }, 0);
    let valorDescontos = data.reduce(function(valorDescontos, venda){
      return valorDescontos + venda.totalDesconto;
    }, 0);
    this.setState({"valorTotal": valorTotal, "valorMercado": valorMercado, "valorDescontos": valorDescontos});
  }

  botoes(row){
    return (
      <React.Fragment>
      </React.Fragment>
    );
  }
  
  render() {
    const { acionista } = this.props;
    const { vendas, compentencia, valorTotal, valorMercado, valorDescontos } = this.state;

    return (
      <React.Fragment>
        <Box width="100%" display="flex" flexDirection="column">
          <Grid container style={{ padding: 20 }} spacing={1}>
            <Grid item xs={12} sm={2}>
              <MonthField 
               id="competencia"
               name="competencia"
               value={compentencia || null}
               onChange={(value) =>{
                this.setState({compentencia: value})
                this.buscarDadosVenda(value);
               }}
               disableFuture={true}
               label="Competência"
               fullWidth
               />
            </Grid>
            <Grid item xs={12} sm={4}>

            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField 
               id="valorMercado"
               name="valorMercado"
               value={maskNumericValue(valorMercado, true) || "R$ 0,00"}
               label="Valor de mercado"
               fullWidth
               />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField 
               id="valorDescontos"
               name="valorDescontos"
               value={maskNumericValue(valorDescontos, true) || "R$ 0,00"}
               label="Economia"
               fullWidth
               />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField 
               id="valorTotal"
               name="valorTotal"
               value={maskNumericValue(valorTotal, true) || "R$ 0,00"}
               label="Valor pago"
               fullWidth
               />
            </Grid>
          </Grid>
          <Grid container style={{ paddingBottom: "7px" }} spacing={1}>
            <Grid item xs={12}>
              <CustomTableWithoutFilter
                {...this.props}
                // visualizar={this.visualizar}
                columns={columns}
                data={vendas}
                botoes={this.botoes}
              />
            </Grid>
          </Grid>
        </Box>
      </React.Fragment>
    );
  }
  
};

export default ExtratoMensalList;