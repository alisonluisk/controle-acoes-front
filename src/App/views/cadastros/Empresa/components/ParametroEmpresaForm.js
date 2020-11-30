import React from "react";
import { Card } from "react-bootstrap";
import TextField from "src/App/components/TextFields/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const ParametroEmpresaForm = (props) => {
  const {
    values: { cotasOn, cotasPn },
    errors,
    empresa,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    dirty,
    setFieldTouched,
    setFieldValue,
  } = props;
  console.log(cotasOn);
  const change = (name, e) => {
    setFieldValue(name, e.target.value.replace(/\D/g, ''), true);
    setFieldTouched(name, true, false);
  };

  const onBlurPercentualField = (name, e) => {
    setFieldTouched(name, true, true);
    if (Number(e.target.value) > 100) {
      setFieldValue(name, 100, true);
    } else {
      setFieldValue(name, e.target.value ? Math.round(e.target.value) : undefined, true);
    }
  };

  return (
    <React.Fragment>
      <Card.Body>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Box width="100%" display="flex" flexDirection="column">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={2}>
                <TextField label="Código" disabled={true} value={empresa.id} fullWidth />
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  id="empresa"
                  name="empresa"
                  disabled={true}
                  defaultValue={empresa.razaoSocial}
                  label="Empresa"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
          <Box width="100%" display="flex" flexDirection="column">
            <Grid container spacing={1}>
            <Grid item xs={12} sm={2}/>
              <Grid item xs={12} sm={5}>
                <TextField
                  id="cotasOn"
                  name="cotasOn"
                  // type="number"
                  helperText={touched.cotasOn ? errors.cotasOn : ""}
                  error={touched.cotasOn && Boolean(errors.cotasOn)}
                  value={cotasOn || ""}
                  onChange={(e) => change("cotasOn", e)}
                  onBlur={(e) => {
                    onBlurPercentualField("cotasOn", e);
                  }}
                  label="Cotas ON"
                  title="Percentual de cotas ON"
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
              <Grid item xs={12} sm={5}>
                <TextField
                  id="cotasPn"
                  name="cotasPn"
                  helperText={touched.cotasPn ? errors.cotasPn : ""}
                  error={touched.cotasPn && Boolean(errors.cotasPn)}
                  value={cotasPn || ""}
                  onChange={(e) => change("cotasPn", e)}
                  onBlur={(e) => {
                    onBlurPercentualField("cotasPn", e);
                  }}
                  label="Cotas PN"
                  title="Percentual de cotas PN"
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
            </Grid>
          </Box>
        </form>
      </Card.Body>
      <Card.Footer className="text-right p-10">
        <button
          disabled={!dirty || !isValid || isSubmitting}
          type="submit"
          onClick={handleSubmit}
          className="btn btn-theme2 md-close"
        >
          Salvar
        </button>
      </Card.Footer>
    </React.Fragment>
  );
};

export default ParametroEmpresaForm;
