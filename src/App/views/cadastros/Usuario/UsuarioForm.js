import React from "react";
import { Card } from "react-bootstrap";
import TextField from "src/App/components/TextFields/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const UsuarioForm = (props) => {
  const {
    values: { usuario, acionista, colaborador, perfilUsuario, id },
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    isValid,
    dirty,
    setFieldTouched,
    setFieldValue,
    perfis
  } = props;

  const change = (name, value) => {
    setFieldValue(name, value?.id || "");
    setFieldTouched(name, true, true);
  };

  const onBlur = (name, e) => {
    setFieldTouched(name, true, true);
  };

  return (
    <React.Fragment>
      <Card.Body>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Box width="100%" display="flex" flexDirection="column">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={2}>
                <TextField label="Código" disabled={true} value={id} fullWidth />
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  id="usuario"
                  name="usuario"
                  disabled={true}
                  defaultValue={usuario}
                  label="Usuário"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
          <Box width="100%" display="flex" flexDirection="column">
            <Grid container spacing={1}>
                <Grid item xs={12} >
                  {colaborador && (
                    <TextField
                      id="colaborador"
                      disabled={true}
                      name="colaborador"
                      defaultValue={colaborador ? colaborador.nome : ""}
                      label="Colaborador"
                      fullWidth
                    />
                  )}
                  {acionista && (
                    <TextField
                      id="acionista"
                      disabled={true}
                      name="acionista"
                      defaultValue={acionista ? acionista.nome : ""}
                      label="Acionista"
                      fullWidth
                    />
                  )}
              </Grid>
                <Grid item xs={12} >
                  <Autocomplete
                  id="perfil-autocomplete"
                  options={perfis}
                  getOptionLabel={(option) => { return option ? `${option.id} - ${option.nome}` : ""}}
                  defaultValue={perfilUsuario}
                  getOptionSelected={(option, value) => option.id === value.id}
                  onBlur={() => { onBlur("codigoPerfilUsuario", null); }}
                  onChange={(e, value) => {
                    change("codigoPerfilUsuario", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="codigoPerfilUsuario"
                      id="codigoPerfilUsuario"
                      helperText={touched.codigoPerfilUsuario ? errors.codigoPerfilUsuario : ""}
                      error={touched.codigoPerfilUsuario && Boolean(errors.codigoPerfilUsuario)}
                      label="Perfil"
                      variant="outlined"
                      fullWidth
                    />
                  )}
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

export default UsuarioForm;
