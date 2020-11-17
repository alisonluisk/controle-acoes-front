import React, { Component } from "react";
import TextField from "src/App/components/TextFields/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import empresaService from "src/App/services/Empresa/EmpresaService.js";
import messageService from "src/App/services/MessageService"

class EmpresaAutoComplete extends Component {
  state = {
    empresas: []
  };

  componentDidMount() {
    empresaService
      .getAllByParams([])
      .then((data) => {
        this.setState({ empresas: data });
        if(data[0]){
          this.props.setFieldValue("codigoEmpresa", data[0].id, true);
          this.props.setFieldValue("empresa", data[0], true);
        }
      })
      .catch((error) => {
        this.setState({ empresas: [] });
        if (error && error.data) {
          messageService.errorMessage(error.data.error, error.data.message);
        }
      });
  }

  render() {
    const {
      values: { empresa, codigoEmpresa },
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
            <Autocomplete
              id="empresa-autocomplete"
              options={this.state.empresas}
              getOptionLabel={(option) => `${ option ? option.razaoSocial : ""}`}
              noOptionsText={'Sem opções'}
              value={empresa || ""}
              getOptionSelected={(option, value) => option.id === value.id}
              onBlur={() => {
                onBlur("codigoEmpresa", null);
              }}
              onChange={(e, value) => {
                change("codigoEmpresa", value, e);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="codigoEmpresa"
                  id="codigoEmpresa"
                  helperText={touched.codigoEmpresa ? errors.codigoEmpresa : ""}
                  error={touched.codigoEmpresa && Boolean(errors.codigoEmpresa)}
                  label="Empresa"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
        </React.Fragment>
    );
  }
};

export default EmpresaAutoComplete;
