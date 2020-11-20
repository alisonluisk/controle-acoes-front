import { Box, Grid } from "@material-ui/core";
import React from "react";
import CustomTable from "src/App/components/Tables/CustomTable.js";
import { maskCurrency } from "src/App/utils/formatterHelper";

const ContaInvestimentoList = (props) => {

  const columns = [
    {
      id: 'tipoContrato',
      label: 'Tipo',
      width: '20%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left'
    },
    {
      id: 'formaPagamento',
      label: 'Forma de pagamento',
      width: '20%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
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
      id: 'valorTotalAplicacao',
      label: 'Valor',
      width: '15%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
      mask: maskCurrency
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


  let fakeData = [];
  fakeData.push({
      tipoContrato: 'Flex',
      formaPagamento: `A integralizar`,
      qtdLotes: 1,
      valorTotalAplicacao: 5000
    });
    fakeData.push({
        tipoContrato: 'Prime',
        formaPagamento: `A vista`,
        qtdLotes: 5,
        valorTotalAplicacao: 20000
      });
  
      console.log(fakeData);
  return (
    <React.Fragment>
      <Box width="100%" display="flex" flexDirection="column">
        <Grid container style={{ paddingBottom: "7px" }} spacing={1}>
          <Grid item xs={12} sm={4}>
            <button
              type="button"
              // onClick={salvar}
              className="btn btn-theme2 md-close"
            >
              Nova conta de investimento
            </button>
          </Grid>
        </Grid>
        <Grid container style={{ paddingBottom: "7px" }} spacing={1}>
          <Grid item xs={12}>
            <CustomTable
                          {...props}
              columns={columns}
              data={fakeData}
            />
          </Grid>
        </Grid>
      </Box>

    </React.Fragment>
  );
};

export default ContaInvestimentoList;