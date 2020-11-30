import React from "react";
import { Card } from "react-bootstrap";
import TextField from "src/App/components/TextFields/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { maskIntegerValue, maskCurrency, numberToCurrency } from "src/App/utils/formatterHelper";
import AcoesEmpresa from "./AcoesEmpresa";
import messageService from "src/App/services/MessageService.js";

const AcoesForm = (props) => {
  const {
    values: { empresa, cotasOn, cotasPn, qtdLotes, valorAcao, parametroAcoes },
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    isValid,
    setFieldTouched,
    setFieldValue,
  } = props;
  
  function handleChange(name, event) {
    event.persist();
    let valor = numberToCurrency(event.target.value);
    setFieldValue(name, valor, true);
    setFieldTouched(name, true, false);
  };

  const blur = (name, e) => {
    setFieldTouched(name, true, true);
  };

  const adicionarEmpresa = (parametro) =>{
    parametroAcoes.push(parametro);
    setFieldValue("parametroAcoes", parametroAcoes);
  }

  const removerEmpresa = (parametro) =>{
    parametroAcoes.splice(parametroAcoes.indexOf(parametro), 1);
    setFieldValue("parametroAcoes", parametroAcoes);
  }

  const salvar = () => {
    if(parametroAcoes.reduce((total, param) => total + param.cotasOn, 0) !== 100 ||
        parametroAcoes.reduce((total, param) => total + param.cotasPn, 0) !== 100){
      messageService.errorMessage("Erro", "Percentual ON e PN deve ser igual a 100%")
      return;
    }
    handleSubmit();
  }

  return (
    <React.Fragment>
      <Card.Body>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Box width="100%" display="flex" flexDirection="column">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={8}>
                <TextField
                  id="empresa"
                  name="empresa"
                  disabled={true}
                  defaultValue={empresa.razaoSocial}
                  label="Empresa"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Qtd. Ações"
                  disabled={true}
                  value={maskIntegerValue(empresa.qtdAcoes || 5050000)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
          <Box width="100%" display="flex" flexDirection="column">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="cotasOn"
                  name="cotasOn"
                  // type="number"
                  disabled
                  helperText={touched.cotasOn ? errors.cotasOn : ""}
                  error={touched.cotasOn && Boolean(errors.cotasOn)}
                  value={cotasOn}
                  label="Cotas ON"
                  title="Percentual de cotas ON a serem geradas"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                    min: "0",
                    max: "100",
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="cotasPn"
                  name="cotasPn"
                  disabled
                  helperText={touched.cotasPn ? errors.cotasPn : ""}
                  error={touched.cotasPn && Boolean(errors.cotasPn)}
                  value={cotasPn}
                  label="Cotas PN"
                  title="Percentual de cotas PN  a serem geradas"
                  fullWidth
                  // type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                    min: "0",
                    max: "100",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  id="qtdLotes"
                  name="qtdLotes"
                  disabled
                  helperText={touched.qtdLotes ? errors.qtdLotes : ""}
                  error={touched.qtdLotes && Boolean(errors.qtdLotes)}
                  value={qtdLotes}
                  label="Qtd. lotes"
                  title="Quantidade de lotes a serem gerados"
                  fullWidth
                  // type="number"
                  InputProps={{
                    min: "0",
                    max: "100",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  autoFocus
                  id="valorAcao"
                  placeholder="R$ 0,00"
                  name="valorAcao"
                  helperText={touched.valorAcao ? errors.valorAcao : ""}
                  error={touched.valorAcao && Boolean(errors.valorAcao)}
                  value={maskCurrency(Number(valorAcao).toFixed(2)) || ''}
                  onChange={(e) => {
                    handleChange("valorAcao", e);
                  }}
                  onBlur={(e) => {
                    blur("valorAcao", e);
                  }}
                  label="Valor da ação"
                  fullWidth
                />
              </Grid>
            </Grid>
            <AcoesEmpresa parametroAcoes={parametroAcoes} setFieldValue={setFieldValue} adicionarEmpresa={adicionarEmpresa} removerEmpresa={removerEmpresa}/>
          </Box> 
        </form>
      </Card.Body>
      <Card.Footer className="text-right p-10">
        <button
          disabled={!isValid || isSubmitting}
          type="submit"
          onClick={salvar}
          className="btn btn-theme2 md-close"
        >
          Gerar ações
        </button>
      </Card.Footer>
    </React.Fragment>
  );
};

export default AcoesForm;
