import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from "src/App/components/TextFields/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import { maskIntegerValue } from "src/App/utils/formatterHelper";

class EmpresaFormAcoes extends Component {

  state = {
  }

  componentDidMount() {

  }

  calcularAcoes(cotas) {
    let qtdAcoesTotal = 5050000;
    return ((qtdAcoesTotal / 2) / 100) * cotas;
  }

  render() {
    const {
      values: {
        qtdAcoes, cotasOn, cotasPn, tipoEmpresa
      },
      errors,
      touched,
      setFieldValue,
      blur,
      change
    } = this.props;
    let { qtdAcoesOn, qtdAcoesPn } = (0, 0);

    const onBlurPercentualField = (name, e) => {
      blur(name, e);
      if (Number(e.target.value) > 100) {
        setFieldValue(name, 100, true)
      } else {
        setFieldValue(name, Math.round(e.target.value), true)
      }
    }

    qtdAcoesOn = this.calcularAcoes(cotasOn);
    qtdAcoesPn = this.calcularAcoes(cotasPn);
    return (
      <React.Fragment>
        <Typography variant="overline" display="block" gutterBottom>
          Configuração para ações
                </Typography>
        <Box display="flex" flexDirection="row">
        {tipoEmpresa && tipoEmpresa !== "HOLDING" && (
          <Box display="flex" width="20%" flexDirection="row">
            <TextField
              disabled
              id="qtdAcoes"
              name="qtdAcoes"
              helperText={touched.qtdAcoes ? errors.qtdAcoes : ""}
              error={touched.qtdAcoes && Boolean(errors.qtdAcoes)}
              value={maskIntegerValue(qtdAcoes || '')}
              onChange={(e) => change("qtdAcoes", e)}
              onBlur={(e) => blur("qtdAcoes", e)}
              label="Quantidade de ações"
              fullWidth
            />
          </Box>
          )}
          {tipoEmpresa && tipoEmpresa !== "FILIAL" && (
            <React.Fragment>
              <Box display="flex" width="10%" flexDirection="row">
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
              </Box>
              <Box display="flex" width="15%" flexDirection="row">
                <TextField
                  disabled
                  value={maskIntegerValue(qtdAcoesOn || '')}
                  label="Quantidade de ações ON"
                  fullWidth
                />
              </Box>
              <Box display="flex" width="10%" flexDirection="row">
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
              </Box>
              <Box display="flex" width="15%" flexDirection="row">
                <TextField
                  disabled
                  value={maskIntegerValue(qtdAcoesPn || '')}
                  label="Quantidade de ações PN"
                  fullWidth
                />
              </Box>
            </React.Fragment>
          )}
        </Box>
      </React.Fragment>
    );
  }
}

export default EmpresaFormAcoes;
