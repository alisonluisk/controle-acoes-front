import React from "react";
import { Card } from "react-bootstrap";
import TextField from "src/App/components/TextFields/TextField";
import DateField from "src/App/components/TextFields/DateField";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FormikComponent from "src/App/components/Views/FormikComponent";
import {
  maskCpfCnpj,
  maskTelefone,
  maskCep,
  maskIntegerValue,
  onlyNumbers,
  maskContaBanco,
  maskCpf,
  maskContaIBolsa,
} from "src/App/utils/formatterHelper";
import findBancoByCodigo from "src/App/utils/bancoUtils";
import MenuItem from "@material-ui/core/MenuItem";
import messageService from "src/App/services/MessageService.js";
import Grid from "@material-ui/core/Grid";
import cepService from "src/App/services/Cep/CepService.js";
import MunicipioAutoComplete from "src/App/components/Autocomplete/MunicipioAutoComplete";
import { CircularProgress } from "@material-ui/core";
import listaBancos from 'src/App/utils/lista_bancos.json'
import Autocomplete from "@material-ui/lab/Autocomplete";

class AcionistaFormInfGerais extends FormikComponent {
  state = {
    titularConta: (this.props.values.cpfContaBanco ? false : true),
    loadingCep: false
  };

  componentDidMount() {}

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
        cpfCnpj,
        conta,
        nome,
        email,
        telefoneFixo,
        telefoneCelular,
        rgInscricao,
        estadoCivil,
        dataNascimento,
        cep,
        logradouro,
        numero,
        bairro,
        complemento,
        cpfRepresentante,
        representante,
        banco,
        agencia,
        numeroConta,
        cpfContaBanco,
        nomeContaBanco
      },
      errors,
      touched,
      setFieldValue,
    } = this.props;
    
    const handleChangeTitularConta = (event) => {
      this.setState({ ...this.state, [event.target.name]: event.target.checked });
      if(!event.target.checked){
        setFieldValue("cpfContaBanco", undefined, false);
        setFieldValue("nomeContaBanco", undefined, false);
      }
    };
    
    return (
      <React.Fragment>
        <Card.Body>
        <Box width="100%" display="flex" flexDirection="column">
            <Grid container style={{ paddingBottom: "7px" }} spacing={1}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  id="cpfCnpj"
                  name="cpfCnpj"
                  helperText={touched.cpfCnpj ? errors.cpfCnpj : ""}
                  error={touched.cpfCnpj && Boolean(errors.cpfCnpj)}
                  value={maskCpfCnpj(cpfCnpj) || ""}
                  onChange={this.changeNumber.bind(null, "cpfCnpj")}
                  onBlur={(e) => {
                    this.blur("cpfCnpj", e);
                  }}
                  label="CPF/CNPJ"
                  fullWidth
                  inputProps={{ maxLength: 18 }}
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
                  label="Nome/Razão Social"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={3}>
                <TextField
                  id="conta"
                  name="conta"
                  disabled
                  value={maskContaIBolsa(conta) || ""}
                  label="Conta"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={4} lg={2}>
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
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <TextField
                  id="telefoneCelular"
                  name="telefoneCelular"
                  helperText={
                    touched.telefoneCelular ? errors.telefoneCelular : ""
                  }
                  error={
                    touched.telefoneCelular && Boolean(errors.telefoneCelular)
                  }
                  value={maskTelefone(telefoneCelular) || ""}
                  onChange={this.changeNumber.bind(null, "telefoneCelular")}
                  onBlur={this.blur.bind(null, "telefoneCelular")}
                  label="Telefone Celular"
                  fullWidth
                  inputProps={{ maxLength: 15 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <TextField
                  id="rgInscricao"
                  name="rgInscricao"
                  helperText={touched.rgInscricao ? errors.rgInscricao : ""}
                  error={touched.rgInscricao && Boolean(errors.rgInscricao)}
                  value={rgInscricao || ""}
                  onChange={this.changeNumber.bind(null, "rgInscricao")}
                  onBlur={this.blur.bind(null, "rgInscricao")}
                  label="RG/Inscrição"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
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
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <DateField
                  id="dataNascimento"
                  name="dataNascimento"
                  helperText={
                    touched.dataNascimento ? errors.dataNascimento : ""
                  }
                  error={
                    touched.dataNascimento && Boolean(errors.dataNascimento)
                  }
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
              <Grid item xs={12} sm={6} md={4} lg={2}>
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
                <MunicipioAutoComplete {...this.props}/>
              </Grid>
            </Grid>
            <Typography variant="overline" display="block" gutterBottom>
              Representante
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  id="representante"
                  name="representante"
                  helperText={touched.representante ? errors.representante : ""}
                  error={touched.representante && Boolean(errors.representante)}
                  value={representante || ""}
                  onChange={this.change.bind(null, "representante")}
                  onBlur={this.blur.bind(null, "representante")}
                  label="Representante Legal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  id="cpfRepresentante"
                  name="cpfRepresentante"
                  helperText={
                    touched.cpfRepresentante ? errors.cpfRepresentante : ""
                  }
                  error={
                    touched.cpfRepresentante && Boolean(errors.cpfRepresentante)
                  }
                  value={maskCpf(cpfRepresentante) || ""}
                  onChange={this.changeNumber.bind(null, "cpfRepresentante")}
                  onBlur={(e) => {
                    this.blur("cpfRepresentante", e);
                  }}
                  label="CPF do Representante"
                  fullWidth
                  inputProps={{ maxLength: 14 }}
                />
              </Grid>
            </Grid>
            <Typography variant="overline" display="block" gutterBottom>
              Dados Bancários
            </Typography>
            <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Autocomplete
                id="conta-autocomplete"
                options={listaBancos}
                getOptionLabel={(option) => { return option ? `${option.codigo} - ${option.banco}` : ""}}
                value={findBancoByCodigo(banco) || ""}
                getOptionSelected={(option, value) => option.codigo === value.codigo}
                onBlur={this.blur.bind(null, "banco")}
                onChange={(e, value) => {
                  this.changeAutoComplete(e, value, "banco");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="banco"
                    id="banco"
                    helperText={touched.banco ? errors.banco : ""}
                    error={touched.banco && Boolean(errors.banco)}
                    label="Banco"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <TextField
                  id="agencia"
                  name="agencia"
                  helperText={touched.agencia ? errors.agencia : ""}
                  error={touched.agencia && Boolean(errors.agencia)}
                  value={onlyNumbers(agencia) || ""}
                  onChange={this.changeNumber.bind(null, "agencia")}
                  onBlur={this.blur.bind(null, "agencia")}
                  label="Agência"
                  fullWidth
                  inputProps={{ maxLength: 4, minLength: 4 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <TextField
                  id="numeroConta"
                  name="numeroConta"
                  helperText={touched.numeroConta ? errors.numeroConta : ""}
                  error={touched.numeroConta && Boolean(errors.numeroConta)}
                  value={maskContaBanco(numeroConta) || ""}
                  onChange={this.change.bind(null, "numeroConta")}
                  onBlur={this.blur.bind(null, "numeroConta")}
                  label="Conta"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={5}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.titularConta}
                    onChange={handleChangeTitularConta}
                    name="titularConta"
                    color="primary"
                  />
                }
                label="Este acionista é titular da conta?"
              />
              </Grid>
            </Grid>
            {!this.state.titularConta && (
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  id="cpfContaBanco"
                  name="cpfContaBanco"
                  helperText={
                    touched.cpfContaBanco ? errors.cpfContaBanco : ""
                  }
                  error={
                    touched.cpfContaBanco && Boolean(errors.cpfContaBanco)
                  }
                  value={maskCpf(cpfContaBanco) || ""}
                  onChange={this.changeNumber.bind(null, "cpfContaBanco")}
                  onBlur={(e) => {
                    this.blur("cpfContaBanco", e);
                  }}
                  label="CPF do Titular"
                  fullWidth
                  inputProps={{ maxLength: 14 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  id="nomeContaBanco"
                  name="nomeContaBanco"
                  helperText={touched.nomeContaBanco ? errors.nomeContaBanco : ""}
                  error={touched.nomeContaBanco && Boolean(errors.nomeContaBanco)}
                  value={nomeContaBanco || ""}
                  onChange={this.change.bind(null, "nomeContaBanco")}
                  onBlur={this.blur.bind(null, "nomeContaBanco")}
                  label="Nome do Titular"
                  fullWidth
                />
              </Grid>
            </Grid>)}
          </Box>
        </Card.Body>
      </React.Fragment>
    );
  }
}

export default AcionistaFormInfGerais;
