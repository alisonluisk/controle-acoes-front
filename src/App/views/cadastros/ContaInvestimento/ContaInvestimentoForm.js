import React, { Component } from "react";
import { Card } from "react-bootstrap";
import TextField from "src/App/components/TextFields/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { maskIntegerValue, maskCurrency, numberToCurrency, maskNumericValue, round } from "src/App/utils/formatterHelper";
import messageService from "src/App/services/MessageService.js";
import { MenuItem, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import AcionistaAutoComplete from "src/App/components/Autocomplete/AcionistaAutoComplete";
import EmpresaAutoComplete from "src/App/components/Autocomplete/EmpresaAutoComplete";
import FormikComponent from "src/App/components/Views/FormikComponent";

class ContaInvestimentoForm extends FormikComponent {
  // const ContaInvestimentoForm = (props) => {


  // function handleChange(name, event) {
  //   event.persist();
  //   let valor = numberToCurrency(event.target.value);
  //   setFieldValue(name, valor, true);
  //   setFieldTouched(name, true, false);
  // };

  // const blur = (name, e) => {
  //   setFieldTouched(name, true, true);
  // };

  // const adicionarEmpresa = (parametro) =>{
  //   parametroAcoes.push(parametro);
  //   setFieldValue("parametroAcoes", parametroAcoes);
  // }

  // const removerEmpresa = (parametro) =>{
  //   parametroAcoes.splice(parametroAcoes.indexOf(parametro), 1);
  //   setFieldValue("parametroAcoes", parametroAcoes);
  // }

  // const salvar = () => {
  //   if(parametroAcoes.reduce((total, param) => total + param.cotasOn, 0) !== 100 ||
  //       parametroAcoes.reduce((total, param) => total + param.cotasPn, 0) !== 100){
  //     messageService.errorMessage("Erro", "Percentual ON e PN deve ser igual a 100%")
  //     return;
  //   }
  //   handleSubmit();
  // }


  render() {
    const {
      values: { tipoContrato, formaPagamento, qtdAcoes, participacao, valorTotalAplicacao, valorAdesao, qtdParcelas, empresa, cotasOn, cotasPn, qtdLotes, valorAcao, acionista, parametroAcoes },
      errors,
      touched,
      handleSubmit,
      isSubmitting,
      isValid,
      setFieldTouched,
      setFieldValue,
    } = this.props;

    const handleChangeQtdLotes = (name, event) => {
      this.changeNumber(name, event);
      let qtd = Number(event.target.value);
      console.log('qtd', qtd)
      console.log(isNaN(qtd))
      if (!isNaN(qtd) && qtd > 0) {
        let qtdAcoes = qtd * 5000;
        let percentual = qtd * 0.20;
        setFieldValue("qtdAcoes", qtdAcoes, true);
        setFieldValue("participacao", round(percentual, 2), true);
        // 2525000
      }
    };

    function handleChangeValor(name, event) {
      let valor = numberToCurrency(event.target.value);
      setFieldValue(name, valor, true);
      // let valorAplicacao = valor * qtdAcoes;
      // setFieldValue("valorTotalAplicacao", valorAplicacao, true);
    }

    // const onBlur = (name, e) => {
    //   setFieldTouched(name, true, true);
    // };

    return (
      <React.Fragment>
        <Card.Body style={{ padding: "15px 15px" }}>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Box width="100%" display="flex" flexDirection="column">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={5}>
                  <AcionistaAutoComplete {...this.props} />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <EmpresaAutoComplete {...this.props} />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    id="codigo"
                    name="codigo"
                    disabled={true}
                    value={"000001"}
                    label="Código"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
            <Box width="100%" display="flex" flexDirection="column">
              <Typography variant="overline" display="block" gutterBottom>
                Informações de investimento
            </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    autoFocus
                    select
                    id="tipoContrato"
                    name="tipoContrato"
                    helperText={touched.tipoContrato ? errors.tipoContrato : ""}
                    error={touched.tipoContrato && Boolean(errors.tipoContrato)}
                    value={tipoContrato || "FLEX"}
                    onBlur={this.blur.bind(null, "tipoContrato")}
                    onChange={this.change.bind(null, "tipoContrato")}
                    label="Tipo contrato"
                    fullWidth
                  >
                    <MenuItem selected value="FLEX">
                      <em>Flex</em>
                    </MenuItem>
                    <MenuItem value="PRIME">
                      <em>Prime</em>
                    </MenuItem>
                    <MenuItem value="LIS_MONEY">
                      <em>Lis Money</em>
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    select
                    id="formaPagamento"
                    name="formaPagamento"
                    helperText={
                      touched.formaPagamento ? errors.formaPagamento : ""
                    }
                    error={
                      touched.formaPagamento && Boolean(errors.formaPagamento)
                    }
                    value={formaPagamento || "FLEX"}
                    onBlur={this.blur.bind(null, "formaPagamento")}
                    onChange={this.change.bind(null, "formaPagamento")}
                    label="Forma de pagamento"
                    fullWidth
                  >
                    <MenuItem selected value="AVISTA">
                      <em>À vista</em>
                    </MenuItem>
                    <MenuItem value="AINTEGRALIZAR">
                      <em>À integralizar</em>
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    id="qtdLotes"
                    name="qtdLotes"
                    helperText={touched.qtdLotes ? errors.qtdLotes : ""}
                    error={touched.qtdLotes && Boolean(errors.qtdLotes)}
                    value={qtdLotes || ""}
                    onBlur={this.blur.bind(null, "qtdLotes")}
                    onChange={(e) => handleChangeQtdLotes("qtdLotes", e)}
                    label="Qtd. Lotes"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    id="qtdAcoes"
                    name="qtdAcoes"
                    // disabled={true}
                    value={qtdAcoes || ""}
                    label="Qtd. Ações"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    id="participacao"
                    name="participacao"
                    // disabled={true}
                    value={maskNumericValue(participacao, false) || ""}
                    label="Participação"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      )
                    }}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    id="valorAcao"
                    name="valorAcao"
                    value={maskCurrency(Number(valorAcao).toFixed(2)) || ''}
                    onChange={(e) => {
                      handleChangeValor("valorAcao", e);
                    }}
                    label="Valor da Ação"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    id="valorTotalAplicacao"
                    name="valorTotalAplicacao"
                    // disabled={true}
                    // value={"R$ 5.000,00"}
                    value={maskCurrency(Number(valorTotalAplicacao).toFixed(2)) || ''}
                    label="Valor Total da Aplicação"
                    fullWidth
                  />
                </Grid>
                {formaPagamento === "AINTEGRALIZAR" &&
                  <React.Fragment>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        id="qtdParcelas"
                        name="qtdParcelas"
                        helperText={touched.qtdParcelas ? errors.qtdParcelas : ""}
                        error={touched.qtdParcelas && Boolean(errors.qtdParcelas)}
                        value={qtdParcelas || ""}
                        onBlur={this.blur.bind(null, "qtdParcelas")}
                        onChange={this.changeNumber.bind(null, "qtdParcelas")}
                        label="Qtd. Parcelas"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        id="aporteMensal"
                        name="aporteMensal"
                        disabled={true}
                        value={"R$ 136,89"}
                        label="Aporte mensal"
                        fullWidth
                      />
                    </Grid>
                  </React.Fragment>}

              </Grid>
              <Typography variant="overline" display="block" gutterBottom>
                Informações de adesão
            </Typography>
              <Grid container spacing={1}>

                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    id="valorAdesao"
                    name="valorAdesao"
                    value={maskCurrency(Number(valorAdesao).toFixed(2)) || ''}
                    onChange={(e) => {
                      handleChangeValor("valorAdesao", e);
                    }}
                    label="Valor Adesão"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    id="qtdParcelasAdesao"
                    name="qtdParcelasAdesao"
                    disabled={true}
                    value={"5"}
                    label="Qtd. Parc. Adesão"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    id="valorParcelaAdesao"
                    name="valorParcelaAdesao"
                    disabled={true}
                    value={"R$ 70,00"}
                    label="Valor Parcela Adesão"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Typography variant="overline" display="block" gutterBottom>
                Observações
            </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} >
                  <TextField
                    id="observacoes"
                    name="observacoes"
                    value={""}
                    fullWidth
                    multiline
                    rows={2}
                  />
                </Grid>
              </Grid>
            </Box>
          </form>
        </Card.Body>
        <Card.Footer className="text-right p-10">
          <button
            disabled={!isValid || isSubmitting}
            type="submit"
            // onClick={salvar}
            className="btn btn-theme2 md-close"
          >
            Gerar conta
        </button>
        </Card.Footer>
      </React.Fragment>
    );
  }
}

const styles = {

}

export default withStyles(styles)(ContaInvestimentoForm);
