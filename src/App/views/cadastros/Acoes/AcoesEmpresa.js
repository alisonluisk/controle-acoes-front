import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Typography from "@material-ui/core/Typography";
import TextField from "src/App/components/TextFields/TextField";
import messageService from "src/App/services/MessageService.js";
import empresaService from "src/App/services/Empresa/EmpresaService.js";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class AcoesEmpresa extends Component {
  state = {
    parametroEmpresas: [],
    parametro: undefined,
    percentualTotal: 100
  };

  componentDidMount() {
    empresaService
      .getAllParametroEmpresas()
      .then((data) => {
        this.setState({ parametroEmpresas: data });
      })
      .catch((error) => {
        this.setState({ parametroEmpresas: [] });
        if (error && error.data) {
          messageService.errorMessage(error.data.error, error.data.message);
        }
      });
  }

  render() {
    const {
      parametroAcoes,
      adicionarEmpresa,
      removerEmpresa
    } = this.props;
    const { parametroEmpresas, parametro } = this.state;

    const selectEmpresa = (value, e) => {
      if(value){
        this.setState({parametro: value})
      }else{
        this.setState({parametro: undefined})
      } 
    }

    const verificarParametros = () =>{
      let totalOn = 0;
      let totalPn = 0;
      parametroAcoes.forEach(parametro => {
        totalOn += parametro.cotasOn;
        totalPn += parametro.cotasPn;
      });
      if((totalOn + parametro.cotasOn) > 100){
        messageService.errorMessage("Erro", "Percentual ON não pode ser maior que 100%");
        return;
      }
      if((totalPn + parametro.cotasPn) > 100){
        messageService.errorMessage("Erro", "Percentual PN não pode ser maior que 100%");
        return;
      }
      var parametroEmpresas = [...this.state.parametroEmpresas]
      parametroEmpresas.splice(parametroEmpresas.indexOf(parametro), 1);
      this.setState({parametroEmpresas});

      adicionarEmpresa(parametro);
      this.setState({parametro: undefined})
    }

    const removerParametro = (empresa) => {
      var parametroEmpresas = [...this.state.parametroEmpresas]
      parametroEmpresas.push(empresa);
      this.setState({parametroEmpresas});
      removerEmpresa(empresa);
    }

    return (
      <React.Fragment>
        <Typography variant="overline" display="block" gutterBottom>
          Empresas ações
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={8} lg={5}>
            <Autocomplete
              id="empresa-autocomplete"
              options={parametroEmpresas}
              getOptionLabel={(option) => `${option ? option.empresa.razaoSocial : ""}`}
              value={parametro || ""}
              getOptionSelected={(option, value) => option.id === (value?.id || "") }
              onChange={(e, value) => {
                selectEmpresa(value, e);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="empresa"
                  id="empresa"
                  label="Empresa"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              id="cotasOnParametro"
              name="cotasOnParametro"
              type="number"
              disabled
              value={parametro ? parametro.cotasOn : ''}
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
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              id="cotasPnParametro"
              name="cotasPnParametro"
              disabled
              value={parametro ? parametro.cotasPn : ''}
              label="Cotas PN"
              title="Percentual de cotas PN  a serem geradas"
              fullWidth
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
                min: "0",
                max: "100",
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={1}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              title="Salvar"
              component="span"
              type="submit"
              onClick={(e) => {
                verificarParametros();
              }}
              disabled={parametro ? false : true }
            >
              <i
                className="feather icon-plus-square"
                style={{ fontSize: 20 }}
              />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "65%" }}>
                      <b>Empresa</b>
                    </TableCell>
                    <TableCell style={{ width: "15%" }}>
                      <b>% On</b>
                    </TableCell>
                    <TableCell style={{ width: "15%" }}>
                      <b>% Pn</b>
                    </TableCell>
                    <TableCell style={{ width: "5%" }}>
                      <b />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {parametroAcoes.map((row) => (
                  <TableRow
                    key={row.id}
                    style={{ height: 20, padding: 0 }}
                  >
                    <TableCell>{row.empresa.razaoSocial}</TableCell>
                    <TableCell>{row.cotasOn}%</TableCell>
                    <TableCell>{row.cotasPn}%</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        title="Remover empresa"
                        component="span"
                        onClick={(e) => { removerParametro(row)}}
                      >
                        <i
                          className="feather icon-x-circle"
                          style={{ fontSize: 19 }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  ))} 
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default AcoesEmpresa;

