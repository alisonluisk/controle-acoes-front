import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "src/App/components/TextFields/TextField";
import { maskIntegerValue } from "src/App/utils/formatterHelper";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";

class EmpresaFormAcoes extends Component {
  state = {};

  componentDidMount() { }

  render() {
    const {
      values: { qtdAcoes, tipoEmpresa, codigoFarmacia },
      errors,
      touched,
      blur,
      change,
      changeNumber
    } = this.props;

    return (
      <React.Fragment>
        <Box
          display="flex"
          flexDirection="row"
          width="100%"
          justifyContent="space-between">
          {tipoEmpresa && tipoEmpresa !== "HOLDING" && (
            <React.Fragment>
              <Grid item xs={2}>
                <Typography variant="overline" display="block" gutterBottom>
                  Configuração para ações
            </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      disabled
                      id="qtdAcoes"
                      name="qtdAcoes"
                      helperText={touched.qtdAcoes ? errors.qtdAcoes : ""}
                      error={touched.qtdAcoes && Boolean(errors.qtdAcoes)}
                      value={maskIntegerValue(qtdAcoes || "")}
                      onChange={(e) => change("qtdAcoes", e)}
                      onBlur={(e) => blur("qtdAcoes", e)}
                      label="Qtd. de ações"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
          {tipoEmpresa && tipoEmpresa !== "HOLDING" && (
            <React.Fragment>
              <Grid item xs={3}>
                <Typography variant="overline" display="block" gutterBottom>
                  Configuração para Integração
                </Typography>
                <Grid item xs={12} >
                  <TextField
                    id="codigoFarmacia"
                    name="codigoFarmacia"
                    helperText={touched.codigoFarmacia ? errors.codigoFarmacia : ""}
                    error={touched.codigoFarmacia && Boolean(errors.codigoFarmacia)}
                    value={maskIntegerValue(codigoFarmacia || "")}
                    onChange={(e) => changeNumber("codigoFarmacia", e)}
                    onBlur={(e) => blur("codigoFarmacia", e)}
                    label="Código farmácia"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </Box>
      </React.Fragment >
    );
  }
}

export default EmpresaFormAcoes;
