import React, { useState } from "react";
import { Card } from "react-bootstrap";
import TextField from "src/App/components/TextFields/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { IconButton, InputAdornment } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const AlterarSenhaForm = (props) => {
  const {
    values: { senha, confirmSenha, senhaAtual, usuario, id },
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    dirty,
    setFieldTouched,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const blur = (name, e) => {
    setFieldTouched(name, true, true);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  return (
    <React.Fragment>
      <Card.Body>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Box width="100%" display="flex" flexDirection="column">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Código"
                  disabled={true}
                  value={id}
                  fullWidth
                />
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
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  id="senha"
                  name="senha"
                  helperText={touched.senha ? errors.senha : ""}
                  error={touched.senha && Boolean(errors.senha)}
                  defaultValue={senha || ""}
                  onChange={change.bind(null, "senha")}
                  onBlur={blur.bind(null, "senha")}
                  label="Senha"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="confirmSenha"
                  name="confirmSenha"
                  helperText={touched.confirmSenha ? errors.confirmSenha : ""}
                  error={touched.confirmSenha && Boolean(errors.confirmSenha)}
                  defaultValue={confirmSenha ||  ""}
                  onChange={change.bind(null, "confirmSenha")}
                  onBlur={blur.bind(null, "confirmSenha")}
                  label="Repetir senha"
                  fullWidth
                  type={showConfirmPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                      >
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                    )
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

export default AlterarSenhaForm;
