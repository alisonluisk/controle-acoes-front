import React, { Component } from "react";
import { Card } from "react-bootstrap";
import TextField from "src/App/components/TextFields/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { maskIntegerValue, maskCurrency, numberToCurrency, maskNumericValue, round } from "src/App/utils/formatterHelper";
import messageService from "src/App/services/MessageService.js";
import { FormControlLabel, MenuItem, Switch, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import AcionistaAutoComplete from "src/App/components/Autocomplete/AcionistaAutoComplete";
import EmpresaAutoComplete from "src/App/components/Autocomplete/EmpresaAutoComplete";
import FormikComponent from "src/App/components/Views/FormikComponent";

class ContaInvestimentoForm extends FormikComponent {

  calcularValoresConta = (qtdLotes, valorAcao, parcelas) => {
    if (!isNaN(qtdLotes) && !isNaN(valorAcao)) {
      let qtdAcoes = qtdLotes * 5000;
      let total = qtdAcoes * valorAcao;
      let percentual = qtdLotes * 0.20;
      this.props.setFieldValue("qtdAcoes", qtdAcoes, true);
      this.props.setFieldValue("participacao", round(percentual, 2), true);
      this.props.setFieldValue("aporteTotal", total, true);
      this.calcularParcelas(parcelas, total);
    }
  }

  calcularParcelas = (qtdParcelas, valorTotalAplicacao) => {
    if (!isNaN(qtdParcelas) && !isNaN(valorTotalAplicacao)) {
      let valorParcela = round((valorTotalAplicacao / qtdParcelas), 2);
      this.props.setFieldValue("aporteMensal", valorParcela, true);
    }
  }

  calcularAdesao = (qtdParcelas, valorAdesao) => {
    if (!isNaN(qtdParcelas) && !isNaN(valorAdesao)) {
      let valorParcela = round((valorAdesao / qtdParcelas), 2);
      this.props.setFieldValue("valorParcelaAdesao", valorParcela, true);
    }else{
      this.props.setFieldValue("valorParcelaAdesao", 0, true);
    }
  }

  render() {
    const {
      values: { tipoContrato, integralizacao, qtdAcoes, participacao, aporteTotal, valorAdesao, parcelas, aporteMensal, parcelaAdesao, qtdLotes, valorAcao, valorParcelaAdesao, observacoes, possuiLinhaCredito, conta },
      errors,
      touched,
      handleSubmit,
      isSubmitting,
      isValid,
      setFieldValue,
    } = this.props;

    const handleChangeQtdLotes = (name, event) => {
      this.changeNumber(name, event);
      let qtd = Number(event.target.value);
      this.calcularValoresConta(qtd, valorAcao, parcelas);
    };

    const handleChangeValor = (name, event) => {
      let valor = numberToCurrency(event.target.value);
      setFieldValue(name, valor, true);
      this.calcularValoresConta(qtdLotes, valor, parcelas);
    }

    const handleChangeQtdParcela = (event) => {
      this.changeNumber("parcelas", event);
      let qtd = Number(event.target.value);
      this.calcularParcelas(qtd, aporteTotal);
    }

    const handleChangeValorAdesao = (name, event) => {
      let valor = numberToCurrency(event.target.value);
      setFieldValue(name, valor, true);
      if(isNaN(valor) || valor == 0)
          setFieldValue("parcelaAdesao", undefined, false); 
      
      this.calcularAdesao(parcelaAdesao, valor);
    }

    const handleChangeQtdParcelaAdesao = (name, event) => {
      this.changeNumber(name, event);
      let qtd = Number(event.target.value);
      this.calcularAdesao(qtd, valorAdesao);
    }

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
                    id="conta"
                    name="conta"
                    disabled={true}
                    value={conta || ""}
                    label="Conta"
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
                    id="integralizacao"
                    name="integralizacao"
                    helperText={
                      touched.integralizacao ? errors.integralizacao : ""
                    }
                    error={
                      touched.integralizacao && Boolean(errors.integralizacao)
                    }
                    value={integralizacao || "FLEX"}
                    onBlur={this.blur.bind(null, "integralizacao")}
                    onChange={this.change.bind(null, "integralizacao")}
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
                    helperText={touched.valorAcao ? errors.valorAcao : ""}
                    error={touched.valorAcao && Boolean(errors.valorAcao)}
                    value={maskCurrency(Number(valorAcao).toFixed(2)) || ''}
                    onChange={(e) => {
                      handleChangeValor("valorAcao", e);
                    }}
                    onBlur={this.blur.bind(null, "valorAcao")}
                    label="Valor da Ação"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    id="aporteTotal"
                    name="aporteTotal"
                    value={maskCurrency(Number(aporteTotal).toFixed(2)) || ''}
                    label="Valor Total da Aplicação"
                    fullWidth
                  />
                </Grid>
                {integralizacao === "AINTEGRALIZAR" &&
                  <React.Fragment>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        id="parcelas"
                        name="parcelas"
                        helperText={touched.parcelas ? errors.parcelas : ""}
                        error={touched.parcelas && Boolean(errors.parcelas)}
                        value={parcelas || ""}
                        onBlur={this.blur.bind(null, "parcelas")}
                        onChange={(e) => handleChangeQtdParcela(e)}
                        label="Qtd. Parcelas"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        id="aporteMensal"
                        name="aporteMensal"
                        value={maskCurrency(Number(aporteMensal).toFixed(2)) || ''}
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
                      handleChangeValorAdesao("valorAdesao", e);
                    }}
                    label="Valor Adesão"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    id="parcelaAdesao"
                    name="parcelaAdesao"
                    helperText={touched.parcelaAdesao ? errors.parcelaAdesao : ""}
                    error={touched.parcelaAdesao && Boolean(errors.parcelaAdesao)}
                    value={parcelaAdesao || ""}
                    disabled={valorAdesao == 0}
                    onBlur={this.blur.bind(null, "parcelaAdesao")}
                    onChange={(e) => handleChangeQtdParcelaAdesao("parcelaAdesao", e)}
                    label="Qtd. Parc. Adesão"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    id="valorParcelaAdesao"
                    name="valorParcelaAdesao"
                    value={maskCurrency(Number(valorParcelaAdesao).toFixed(2)) || ''}
                    label="Valor Parcela Adesão"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3} >
                <FormControlLabel
                  control={
                    <Switch
                      checked={possuiLinhaCredito}
                      onChange={this.change.bind(null, "possuiLinhaCredito")}
                      name="possuiLinhaCredito"
                      color="primary"
                    />
                  }
                  label="Possui linha de crédito?"
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
                    onBlur={this.blur.bind(null, "observacoes")}
                    onChange={this.change.bind(null, "observacoes")}
                    value={observacoes || ""}
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
            onClick={handleSubmit}
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
