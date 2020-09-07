import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "src/App/components/TextFields/TextField";
import { maskIntegerValue } from "src/App/utils/formatterHelper";
import Grid from "@material-ui/core/Grid";

class EmpresaFormAcoes extends Component {
  state = {};

  componentDidMount() {}

  // calcularAcoes(cotas) {
  //   let qtdAcoesTotal = 5050000;
  //   return (qtdAcoesTotal / 2 / 100) * cotas;
  // }

  render() {
    const {
      values: { qtdAcoes, tipoEmpresa },
      errors,
      touched,
      blur,
      change,
    } = this.props;
    // let { qtdAcoesOn, qtdAcoesPn } = (0, 0);

    // const onBlurPercentualField = (name, e) => {
    //   blur(name, e);
    //   if (Number(e.target.value) > 100) {
    //     setFieldValue(name, 100, true);
    //   } else {
    //     setFieldValue(name, Math.round(e.target.value), true);
    //   }
    // };

    // qtdAcoesOn = this.calcularAcoes(cotasOn);
    // qtdAcoesPn = this.calcularAcoes(cotasPn);
    return (
      <React.Fragment>
        {tipoEmpresa && tipoEmpresa !== "HOLDING" && (
          <React.Fragment>
            <Typography variant="overline" display="block" gutterBottom>
              Configuração para ações
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={6} lg={2}>
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
          </React.Fragment>
        )}
        {/* {tipoEmpresa && tipoEmpresa !== "FILIAL" && (
            <React.Fragment>
              <Grid item xs={12} sm={6} md={6} lg={2}>
                <TextField
                  id="cotasOn"
                  name="cotasOn"
                  type="number"
                  helperText={touched.cotasOn ? errors.cotasOn : ""}
                  error={touched.cotasOn && Boolean(errors.cotasOn)}
                  value={cotasOn || ''}
                  onChange={(e) => change("cotasOn", e)}
                  onBlur={(e) => { onBlurPercentualField("cotasOn", e) }}
                  label="Cotas ON"
                  title="Percentual de cotas ON"
                  InputProps={{
                    endAdornment: <InputAdornment position="start">%</InputAdornment>,
                    min: "0",
                    max: "100",
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={2}>
                <TextField
                  disabled
                  value={maskIntegerValue(qtdAcoesOn || '')}
                  label="Qtd. de ações ON"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={2}>
                <TextField
                  id="cotasPn"
                  name="cotasPn"
                  helperText={touched.cotasPn ? errors.cotasPn : ""}
                  error={touched.cotasPn && Boolean(errors.cotasPn)}
                  value={cotasPn || ''}
                  onChange={(e) => change("cotasPn", e)}
                  onBlur={(e) => { onBlurPercentualField("cotasPn", e) }}
                  label="Cotas PN"
                  title="Percentual de cotas PN"
                  fullWidth
                  type="number"
                  InputProps={{
                    endAdornment: <InputAdornment position="start">%</InputAdornment>,
                    min: "0",
                    max: "100",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={2}>
                <TextField
                  disabled
                  value={maskIntegerValue(qtdAcoesPn || '')}
                  label="Qtd. de ações PN"
                  fullWidth
                />
              </Grid>
            </React.Fragment>
          )} */}
      </React.Fragment>
    );
  }
}

export default EmpresaFormAcoes;
