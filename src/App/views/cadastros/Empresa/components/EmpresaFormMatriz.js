import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Typography from "@material-ui/core/Typography";
import TextField from "src/App/components/TextFields/TextField";
import messageService from "src/App/services/MessageService.js";
import empresaService from "src/App/services/Empresa/EmpresaService.js";
import Grid from "@material-ui/core/Grid";

class EmpresaFormMatriz extends Component {
  state = {
    matrizes: [],
  };

  componentDidMount() {
    let params = [{ chave: "tipoEmpresa", valor: "MATRIZ" }];
    empresaService
      .getAllByParams(params)
      .then((data) => {
        this.setState({ matrizes: data });
      })
      .catch((error) => {
        this.setState({ matrizes: [] });
        if (error && error.data) {
          messageService.errorMessage(error.data.error, error.data.message);
        }
      });
  }

  render() {
    const {
      values: { matriz },
      errors,
      touched,
      setFieldTouched,
      setFieldValue,
    } = this.props;

    const change = (name, value, e) => {
      setFieldValue(name, value?.id || "");
      setFieldTouched(name, true, false);
    };

    const onBlur = (name, e) => {
      setFieldTouched(name, true, true);
    };

    return (
      <React.Fragment>
        <Typography variant="overline" display="block" gutterBottom>
          Matriz
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={8} lg={6}>
            <Autocomplete
              id="matriz-autocomplete"
              options={this.state.matrizes}
              getOptionLabel={(option) => `${option.razaoSocial}`}
              defaultValue={matriz}
              getOptionSelected={(option, value) => option.id === value.id}
              onBlur={() => {
                onBlur("codigoMatriz", null);
              }}
              onChange={(e, value) => {
                change("codigoMatriz", value, e);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="codigoMatriz"
                  id="codigoMatriz"
                  helperText={touched.codigoMatriz ? errors.codigoMatriz : ""}
                  error={touched.codigoMatriz && Boolean(errors.codigoMatriz)}
                  label="Matriz"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default EmpresaFormMatriz;
