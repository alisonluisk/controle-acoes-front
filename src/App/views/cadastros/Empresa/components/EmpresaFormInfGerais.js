import React from "react";
import { Card } from "react-bootstrap";
import TextField from "src/App/components/TextFields/TextField";
import DateField from "src/App/components/TextFields/DateField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FormikComponent from "src/App/components/Views/FormikComponent";
import {
  maskCnpj,
  maskTelefone,
  maskCep,
  maskIntegerValue,
  onlyNumbers,
} from "src/App/utils/formatterHelper";
import MenuItem from "@material-ui/core/MenuItem";
import messageService from "src/App/services/MessageService.js";
import Grid from "@material-ui/core/Grid";
import cepService from "src/App/services/Cep/CepService.js";
import EmpresaFormMatriz from "./EmpresaFormMatriz";
import empresaService from "src/App/services/Empresa/EmpresaService.js";
import EmpresaFormAcoes from "./EmpresaFormAcoes";
import moment from "moment";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { CircularProgress } from "@material-ui/core";

class EmpresaFormInfGerais extends FormikComponent {
  state = {
    matrizes: [],
    loadingCep: false
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

  buscarCep = async (codigo) => {
    if (codigo && codigo.length === 8) {
      this.setState({loadingCep: true});
      cepService
        .getByCodigo(onlyNumbers(codigo))
        .then((data) => {
          this.props.setFieldValue("logradouro", data.logradouro, true);
          this.props.setFieldValue("bairro", data.bairro, true);
          this.props.setFieldValue("municipio", data.municipio, true);
          this.props.setFieldValue("codigoMunicipio", data.ibge, true);
          this.props.setFieldValue("cep", onlyNumbers(data.cep), true);
          this.setState({loadingCep: false});
        })
        .catch((error) => {
          this.props.setFieldValue("cep", "", true);
          this.setState({loadingCep: false});
          if (error && error.data) {
            messageService.errorMessage(error.data.error, error.data.message);
          }
        });
    }
  };

  render() {
    const {
      values: {
        cnpj,
        razaoSocial,
        tipoEmpresa,
        nomeFantasia,
        telefone,
        dataAbertura,
        email,
        cep,
        logradouro,
        numero,
        bairro,
        complemento,
        municipio,
      },
      errors,
      touched,
    } = this.props;

    const buscarCnpj = async () => {
      if (cnpj.length === 14) {
        empresaService
          .buscarCnpj(onlyNumbers(cnpj))
          .then((response) => {
            this.props.setFieldValue(
              "logradouro",
              response.data.cepObj.logradouro,
              true
            );
            this.props.setFieldValue(
              "bairro",
              response.data.cepObj.bairro,
              true
            );
            this.props.setFieldValue(
              "municipio",
              response.data.cepObj.municipio,
              true
            );
            this.props.setFieldValue(
              "codigoMunicipio",
              response.data.cepObj.ibge,
              true
            );
            this.props.setFieldValue(
              "cep",
              onlyNumbers(response.data.cepObj.cep),
              true
            );
            this.props.setFieldValue(
              "numero",
              onlyNumbers(response.data.numero),
              true
            );
            this.props.setFieldValue("razaoSocial", response.data.nome);
            this.props.setFieldValue("nomeFantasia", response.data.fantasia);
            this.props.setFieldValue("email", response.data.email);
            this.props.setFieldValue(
              "telefone",
              onlyNumbers(response.data.telefone)
            );
            this.props.setFieldValue(
              "dataAbertura",
              moment(response.data.abertura, "DD/MM/YYYY")
            );
          })
          .catch((error) => {
            if (error && error.data) {
              messageService.errorMessage(error.data.error, error.data.message);
            }
          });
      }
    };

    const handleChangeTipoEmpresa = (name, e) => {
      switch (e.target.value) {
        case "HOLDING":
          this.props.setFieldValue("qtdAcoes", "", true);
          break;
        case "MATRIZ":
          this.props.setFieldValue("qtdAcoes", "5050000", true);
          break;
        case "FILIAL":
          this.props.setFieldValue("qtdAcoes", "5050000", true);
          this.props.setFieldValue("cotasOn", "", true);
          this.props.setFieldValue("cotasPn", "", true);
          break;
        default:
          break;
      }
      this.change(name, e);
    };

    return (
      <React.Fragment>
        <Card.Body>
          <Box
            display="flex"
            flexDirection="row"
            width="100%"
            justifyContent="space-between"
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={5} lg={3}>
                <TextField
                  autoFocus
                  select
                  id="tipoEmpresa"
                  name="tipoEmpresa"
                  helperText={touched.tipoEmpresa ? errors.tipoEmpresa : ""}
                  error={touched.tipoEmpresa && Boolean(errors.tipoEmpresa)}
                  value={tipoEmpresa || "F"}
                  onChange={(e) => handleChangeTipoEmpresa("tipoEmpresa", e)}
                  onBlur={this.blur.bind(null, "tipoEmpresa")}
                  label="Tipo empresa"
                  fullWidth
                >
                  <MenuItem selected value="HOLDING">
                    <em>HOLDING</em>
                  </MenuItem>
                  <MenuItem value="MATRIZ">
                    <em>MATRIZ</em>
                  </MenuItem>
                  <MenuItem value="FILIAL">
                    <em>FILIAL</em>
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>
          <Box width="100%" display="flex" flexDirection="column">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <TextField
                  id="cnpj"
                  name="cnpj"
                  helperText={touched.cnpj ? errors.cnpj : ""}
                  error={touched.cnpj && Boolean(errors.cnpj)}
                  value={maskCnpj(cnpj) || ""}
                  onChange={this.changeNumber.bind(null, "cnpj")}
                  onBlur={(e) => {
                    this.blur("cnpj", e);
                  }}
                  label="Cnpj"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          color="primary"
                          title="Buscar cnpj"
                          component="span"
                          onClick={(e) => buscarCnpj()}
                        >
                          <i
                            className="feather icon-search"
                            style={{ fontSize: 19 }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                    min: "0",
                    max: "100",
                  }}
                  fullWidth
                  inputProps={{ maxLength: 18 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  id="razaoSocial"
                  name="razaoSocial"
                  helperText={touched.razaoSocial ? errors.razaoSocial : ""}
                  error={touched.razaoSocial && Boolean(errors.razaoSocial)}
                  value={razaoSocial || ""}
                  onChange={this.change.bind(null, "razaoSocial")}
                  onBlur={this.blur.bind(null, "razaoSocial")}
                  label="Razão Social"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <TextField
                  id="telefone"
                  name="telefone"
                  helperText={touched.telefone ? errors.telefone : ""}
                  error={touched.telefone && Boolean(errors.telefone)}
                  value={maskTelefone(telefone) || ""}
                  onChange={this.changeNumber.bind(null, "telefone")}
                  onBlur={this.blur.bind(null, "telefone")}
                  label="Telefone"
                  fullWidth
                  inputProps={{ maxLength: 15 }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={3}>
                <TextField
                  id="email"
                  name="email"
                  helperText={touched.email ? errors.email : ""}
                  error={touched.email && Boolean(errors.email)}
                  value={email || ""}
                  onChange={this.change.bind(null, "email")}
                  onBlur={this.blur.bind(null, "email")}
                  label="Email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  id="nomeFantasia"
                  name="nomeFantasia"
                  helperText={touched.nomeFantasia ? errors.nomeFantasia : ""}
                  error={touched.nomeFantasia && Boolean(errors.nomeFantasia)}
                  value={nomeFantasia || ""}
                  onChange={this.change.bind(null, "nomeFantasia")}
                  onBlur={this.blur.bind(null, "nomeFantasia")}
                  label="Nome Fantasia"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <DateField
                  id="dataAbertura"
                  name="dataAbertura"
                  helperText={touched.dataAbertura ? errors.dataAbertura : ""}
                  error={touched.dataAbertura && Boolean(errors.dataAbertura)}
                  value={dataAbertura || null}
                  onChange={(value) =>
                    this.props.setFieldValue("dataAbertura", value)
                  }
                  onBlur={this.blur.bind(null, "dataAbertura")}
                  disableFuture={true}
                  label="Data de abertura"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Typography variant="overline" display="block" gutterBottom>
              Endereço
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={3} md={3} lg={2}>
                <TextField
                  id="cep"
                  name="cep"
                  helperText={touched.cep ? errors.cep : ""}
                  error={touched.cep && Boolean(errors.cep)}
                  value={maskCep(cep) || ""}
                  onChange={this.changeNumber.bind(null, "cep")}
                  onBlur={(e) => {
                    this.blur("cep", e);
                    this.buscarCep(cep);
                  }}
                  label="Cep"
                  inputProps={{maxLength: 9}}
                  InputProps={{
                    endAdornment: (
                      <React.Fragment>
                        {this.state.loadingCep ? <CircularProgress color="inherit" size={20} /> : null}
                      </React.Fragment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={8}>
                <TextField
                  id="logradouro"
                  name="logradouro"
                  helperText={touched.logradouro ? errors.logradouro : ""}
                  error={touched.logradouro && Boolean(errors.logradouro)}
                  value={logradouro || ""}
                  onChange={this.change.bind(null, "logradouro")}
                  onBlur={this.blur.bind(null, "logradouro")}
                  label="Endereço"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3} md={3} lg={2}>
                <TextField
                  id="numero"
                  name="numero"
                  helperText={touched.numero ? errors.numero : ""}
                  error={touched.numero && Boolean(errors.numero)}
                  value={maskIntegerValue(numero) || ""}
                  onChange={this.changeNumber.bind(null, "numero")}
                  onBlur={this.blur.bind(null, "numero")}
                  label="Número"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <TextField
                  id="bairro"
                  name="bairro"
                  helperText={touched.bairro ? errors.bairro : ""}
                  error={touched.bairro && Boolean(errors.bairro)}
                  value={bairro || ""}
                  onChange={this.change.bind(null, "bairro")}
                  onBlur={this.blur.bind(null, "bairro")}
                  label="Bairro"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <TextField
                  id="complemento"
                  name="complemento"
                  helperText={touched.complemento ? errors.complemento : ""}
                  error={touched.complemento && Boolean(errors.complemento)}
                  value={complemento || ""}
                  onChange={this.change.bind(null, "complemento")}
                  onBlur={this.blur.bind(null, "complemento")}
                  label="Complemento"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <TextField
                  disabled
                  id="municipio"
                  name="municipio"
                  helperText={touched.municipio ? errors.municipio : ""}
                  error={touched.municipio && Boolean(errors.municipio)}
                  value={
                    municipio
                      ? `${municipio.nome} - ${municipio.estado.sigla}`
                      : ""
                  }
                  onChange={this.change.bind(null, "municipio")}
                  onBlur={this.blur.bind(null, "municipio")}
                  label="Município"
                  fullWidth
                />
              </Grid>
            </Grid>
            {tipoEmpresa === "FILIAL" && <EmpresaFormMatriz {...this.props} />}
            <EmpresaFormAcoes
              {...this.props}
              blur={this.blur}
              change={this.change}
            />
          </Box>
        </Card.Body>
      </React.Fragment>
    );
  }
}

export default EmpresaFormInfGerais;
