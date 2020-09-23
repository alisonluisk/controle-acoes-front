import React from "react";
import { Card } from "react-bootstrap";
import TextField from "src/App/components/TextFields/TextField";
import DateField from "src/App/components/TextFields/DateField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FormikComponent from "src/App/components/Views/FormikComponent";
import {
  maskCpf,
  maskTelefone,
  maskCep,
  maskIntegerValue,
  onlyNumbers,
} from "src/App/utils/formatterHelper";
import MenuItem from "@material-ui/core/MenuItem";
import messageService from "src/App/services/MessageService.js";
import Grid from "@material-ui/core/Grid";
import cepService from "src/App/services/Cep/CepService.js";

class ColaboradorFormInfGerais extends FormikComponent {
  state = {

  };

  componentDidMount() {
  }

  buscarCep = async (codigo) => {
    if (codigo && codigo.length === 8) {
      cepService
        .getByCodigo(onlyNumbers(codigo))
        .then((data) => {
          this.props.setFieldValue("logradouro", data.logradouro, true);
          this.props.setFieldValue("bairro", data.bairro, true);
          this.props.setFieldValue("municipio", data.municipio, true);
          this.props.setFieldValue("codigoMunicipio", data.ibge, true);
          this.props.setFieldValue("cep", onlyNumbers(data.cep), true);
        })
        .catch((error) => {
          this.props.setFieldValue("cep", "", true);
          if (error && error.data) {
            messageService.errorMessage(error.data.error, error.data.message);
          }
        });
    }
  };

  render() {
    const {
      values: {
        cpf,
        nome,
        email,
        telefoneFixo,
        telefoneCelular,
        rg,
        estadoCivil,
        dataNascimento,
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
console.log(errors, touched)
    return (
      <React.Fragment>
        <Card.Body>
          <Box width="100%" display="flex" flexDirection="column">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <TextField
                  id="cpf"
                  name="cpf"
                  helperText={touched.cpf ? errors.cpf : ""}
                  error={touched.cpf && Boolean(errors.cpf)}
                  value={maskCpf(cpf) || ""}
                  onChange={this.changeNumber.bind(null, "cpf")}
                  onBlur={(e) => {
                    this.blur("cpf", e);
                  }}
                  label="CPF"
                  fullWidth
                  inputProps={{ maxLength: 14 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  id="nome"
                  name="nome"
                  helperText={touched.nome ? errors.nome : ""}
                  error={touched.nome && Boolean(errors.nome)}
                  value={nome || ""}
                  onChange={this.change.bind(null, "nome")}
                  onBlur={this.blur.bind(null, "nome")}
                  label="Nome"
                  fullWidth
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
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <TextField
                  id="rg"
                  name="rg"
                  helperText={touched.rg ? errors.rg : ""}
                  error={touched.rg && Boolean(errors.rg)}
                  value={rg || ""}
                  onChange={this.changeNumber.bind(null, "rg")}
                  onBlur={this.blur.bind(null, "rg")}
                  label="RG"
                  fullWidth
                  inputProps={{ maxLength: 15 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <TextField
                  select
                  id="estadoCivil"
                  name="estadoCivil"
                  helperText={touched.estadoCivil ? errors.estadoCivil : ""}
                  error={touched.estadoCivil && Boolean(errors.estadoCivil)}
                  value={estadoCivil || "SOLTEIRO"}
                  onChange={this.change.bind(null, "estadoCivil")}
                  onBlur={this.blur.bind(null, "estadoCivil")}
                  label="Estado Civil"
                  fullWidth
                >
                  <MenuItem selected value="SOLTEIRO">
                    <em>Solteiro</em>
                  </MenuItem>
                  <MenuItem value="CASADO">
                    <em>Casado</em>
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <DateField
                  id="dataNascimento"
                  name="dataNascimento"
                  helperText={touched.dataNascimento ? errors.dataNascimento : ""}
                  error={touched.dataNascimento && Boolean(errors.dataNascimento)}
                  value={dataNascimento || null}
                  onChange={(value) =>
                    this.props.setFieldValue("dataNascimento", value)
                  }
                  onBlur={this.blur.bind(null, "dataNascimento")}
                  disableFuture={true}
                  label="Dt. de nascimento"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <TextField
                  id="telefoneFixo"
                  name="telefoneFixo"
                  helperText={touched.telefoneFixo ? errors.telefoneFixo : ""}
                  error={touched.telefoneFixo && Boolean(errors.telefoneFixo)}
                  value={maskTelefone(telefoneFixo) || ""}
                  onChange={this.changeNumber.bind(null, "telefoneFixo")}
                  onBlur={this.blur.bind(null, "telefoneFixo")}
                  label="Telefone Fixo"
                  fullWidth
                  inputProps={{ maxLength: 15 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <TextField
                  id="telefoneCelular"
                  name="telefoneCelular"
                  helperText={touched.telefoneCelular ? errors.telefoneCelular : ""}
                  error={touched.telefoneCelular && Boolean(errors.telefoneCelular)}
                  value={maskTelefone(telefoneCelular) || ""}
                  onChange={this.changeNumber.bind(null, "telefoneCelular")}
                  onBlur={this.blur.bind(null, "telefoneCelular")}
                  label="Telefone Celular"
                  fullWidth
                  inputProps={{ maxLength: 15 }}
                />
              </Grid>
            </Grid>
            <Typography variant="overline" display="block" gutterBottom>
              Endereço
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={3} lg={2}>
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
                  inputProps={{ maxLength: 9 }}
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
              <Grid item xs={12} sm={6} md={3} lg={2}>
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
              <Grid item xs={12} sm={6} md={4} lg={4}>
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
              <Grid item xs={12} sm={6} md={4} lg={4}>
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
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <TextField
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
          </Box>
        </Card.Body>
      </React.Fragment>
    );
  }
}

export default ColaboradorFormInfGerais;
