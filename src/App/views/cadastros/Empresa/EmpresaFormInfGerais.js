import React from "react";
import { Card } from "react-bootstrap";
import TextField from "src/App/components/TextFields/TextField";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormikComponent from 'src/App/components/Views/FormikComponent';
import { maskCnpj, maskTelefone, maskCep, maskIntegerValue } from "src/App/utils/formatterHelper";
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';

class EmpresaFormInfGerais extends FormikComponent {

  state = {
  }

  componentDidMount() {
  }

  render() {
    const {
      values: {
        id, cnpj, razaoSocial, tipoEmpresa, nomeFantasia, telefone, dataAbertura, email, cep,
        logradouro, numero, bairro, complemento, municipio, qtd_acoes, cotas_on, cotas_pn
      },
      errors,
      touched,
      buscarCep
    } = this.props;

    const onBlurPercentualField = (name, e) => {
      this.blur(name, e);
      if (Number(e.target.value) > 100) {
        this.props.setFieldValue(name, 100, true)
      } else {
        this.props.setFieldValue(name, Math.round(e.target.value), true)
      }
    }

    return (
      <React.Fragment>
        <Card.Body>
          <Box display="flex" flexDirection="row" width="100%" justifyContent="space-between" >
            <Box display="flex" flexDirection="row" width="20%">
              <TextField label="Código" disabled={true} value={id || ''} />
            </Box>

            <Box display="flex" width="20%" flexDirection="row">
              <TextField
                autoFocus
                select
                id="tipoEmpresa"
                name="tipoEmpresa"
                helperText={touched.tipoEmpresa ? errors.tipoEmpresa : ""}
                error={touched.tipoEmpresa && Boolean(errors.tipoEmpresa)}
                value={tipoEmpresa || 'F'}
                onChange={(e) => {
                  if(e.target.value === "HOLDING"){
                    this.props.setFieldValue("qtd_acoes", '', true);
                  }
                  this.props.setFieldValue("tipoEmpresa", e.target.value, true);
                }}
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
            </Box>
          </Box>
          <Box width="100%" display="flex" flexDirection="column">
            <Box display="flex" flexDirection="row">
              <Box width="20%">
                <TextField
                  autoFocus
                  id="cnpj"
                  name="cnpj"
                  helperText={touched.cnpj ? errors.cnpj : ""}
                  error={touched.cnpj && Boolean(errors.cnpj)}
                  value={maskCnpj(cnpj) || ''}
                  onChange={this.change.bind(null, "cnpj")}
                  onBlur={this.blur.bind(null, "cnpj")}
                  label="Cnpj"
                  fullWidth
                  inputProps={{ maxLength: 18 }}
                />
              </Box>
              <Box width="40%">
                <TextField
                  autoFocus
                  id="razaoSocial"
                  name="razaoSocial"
                  helperText={touched.razaoSocial ? errors.razaoSocial : ""}
                  error={touched.razaoSocial && Boolean(errors.razaoSocial)}
                  value={razaoSocial || ''}
                  onChange={this.change.bind(null, "razaoSocial")}
                  onBlur={this.blur.bind(null, "razaoSocial")}
                  label="Razão Social"
                  fullWidth
                />
              </Box>
              <Box width="40%">
                <TextField
                  autoFocus
                  id="nomeFantasia"
                  name="nomeFantasia"
                  helperText={touched.nomeFantasia ? errors.nomeFantasia : ""}
                  error={touched.nomeFantasia && Boolean(errors.nomeFantasia)}
                  value={nomeFantasia || ''}
                  onChange={this.change.bind(null, "nomeFantasia")}
                  onBlur={this.blur.bind(null, "nomeFantasia")}
                  label="Nome Fantasia"
                  fullWidth
                />
              </Box>
            </Box>
            <Box display="flex" flexDirection="row">
              <Box width="20%">
                <TextField
                  id="telefone"
                  name="telefone"
                  helperText={touched.telefone ? errors.telefone : ""}
                  error={touched.telefone && Boolean(errors.telefone)}
                  value={maskTelefone(telefone) || ''}
                  onChange={this.change.bind(null, "telefone")}
                  onBlur={this.blur.bind(null, "telefone")}
                  label="Telefone"
                  fullWidth
                  inputProps={{ maxLength: 15 }}
                />
              </Box>
              <Box width="40%">
                <TextField
                  id="email"
                  name="email"
                  helperText={touched.email ? errors.email : ""}
                  error={touched.email && Boolean(errors.email)}
                  value={email || ''}
                  onChange={this.change.bind(null, "email")}
                  onBlur={this.blur.bind(null, "email")}
                  label="Email"
                  fullWidth
                />
              </Box>
              <Box width="20%">
              </Box>
              <Box width="20%">
                <TextField
                  id="dataAbertura"
                  name="dataAbertura"
                  helperText={touched.dataAbertura ? errors.dataAbertura : ""}
                  error={touched.dataAbertura && Boolean(errors.dataAbertura)}
                  value={dataAbertura || ''}
                  onChange={this.change.bind(null, "dataAbertura")}
                  onBlur={this.blur.bind(null, "dataAbertura")}
                  label="Data de abertura"
                  fullWidth
                />
              </Box>
            </Box>
            <Typography variant="overline" display="block" gutterBottom>
              Endereço
                </Typography>
            <Box display="flex" flexDirection="row">
              <TextField
                id="cep"
                name="cep"
                helperText={touched.cep ? errors.cep : ""}
                error={touched.cep && Boolean(errors.cep)}
                value={maskCep(cep) || ''}
                onChange={this.change.bind(null, "cep")}
                onBlur={(e) => {
                  this.blur("cep", e);
                  buscarCep(e.target.value);
                }}
                label="Cep"
                inputProps={{ maxLength: 9 }}
              />
              <TextField
                id="logradouro"
                name="logradouro"
                helperText={touched.logradouro ? errors.logradouro : ""}
                error={touched.logradouro && Boolean(errors.logradouro)}
                value={logradouro || ''}
                onChange={this.change.bind(null, "logradouro")}
                onBlur={this.blur.bind(null, "logradouro")}
                label="Endereço"
                fullWidth
              />
              <TextField
                id="numero"
                name="numero"
                helperText={touched.numero ? errors.numero : ""}
                error={touched.numero && Boolean(errors.numero)}
                value={numero || ''}
                onChange={this.change.bind(null, "numero")}
                onBlur={this.blur.bind(null, "numero")}
                label="Número"
              />
            </Box>

            <Box display="flex" flexDirection="row">
              <TextField
                id="bairro"
                name="bairro"
                helperText={touched.bairro ? errors.bairro : ""}
                error={touched.bairro && Boolean(errors.bairro)}
                value={bairro || ''}
                onChange={this.change.bind(null, "bairro")}
                onBlur={this.blur.bind(null, "bairro")}
                label="Bairro"
                fullWidth
              />
              <TextField
                id="complemento"
                name="complemento"
                helperText={touched.complemento ? errors.complemento : ""}
                error={touched.complemento && Boolean(errors.complemento)}
                value={complemento || ''}
                onChange={this.change.bind(null, "complemento")}
                onBlur={this.blur.bind(null, "complemento")}
                label="Complemento"
                fullWidth
              />
              <TextField
                disabled
                id="municipio"
                name="municipio"
                helperText={touched.municipio ? errors.municipio : ""}
                error={touched.municipio && Boolean(errors.municipio)}
                value={municipio ? `${municipio.nome} - ${municipio.estado.sigla}` : ''}
                onChange={this.change.bind(null, "municipio")}
                onBlur={this.blur.bind(null, "municipio")}
                label="Município"
                fullWidth
              />
            </Box>
            <Typography variant="overline" display="block" gutterBottom>
              Configuração para ações
                </Typography>
            <Box display="flex" flexDirection="row">
              <Box display="flex" width="20%" flexDirection="row">
                <TextField
                  disabled={ tipoEmpresa === "HOLDING" }
                  id="qtd_acoes"
                  name="qtd_acoes"
                  helperText={touched.qtd_acoes ? errors.qtd_acoes : ""}
                  error={touched.qtd_acoes && Boolean(errors.qtd_acoes)}
                  value={maskIntegerValue(qtd_acoes || '') || ''}
                  onChange={this.change.bind(null, "qtd_acoes")}
                  onBlur={this.blur.bind(null, "qtd_acoes")}
                  label="Quantidade de ações"
                  fullWidth
                />
              </Box>
              <Box display="flex" width="20%" flexDirection="row">
                <TextField
                  id="cotas_on"
                  name="cotas_on"
                  type="number"
                  helperText={touched.cotas_on ? errors.cotas_on : ""}
                  error={touched.cotas_on && Boolean(errors.cotas_on)}
                  value={cotas_on || ''}
                  onChange={this.change.bind(null, "cotas_on")}
                  onBlur={(e) => { onBlurPercentualField("cotas_on", e) }}
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
              <Box display="flex" width="20%" flexDirection="row">
                <TextField
                  id="cotas_pn"
                  name="cotas_pn"
                  helperText={touched.cotas_pn ? errors.cotas_pn : ""}
                  error={touched.cotas_pn && Boolean(errors.cotas_pn)}
                  value={cotas_pn || ''}
                  onChange={this.change.bind(null, "cotas_pn")}
                  onBlur={(e) => { onBlurPercentualField("cotas_pn", e) }}
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
            </Box>
          </Box>
        </Card.Body>
      </React.Fragment>
    );
  }
};

export default EmpresaFormInfGerais;
