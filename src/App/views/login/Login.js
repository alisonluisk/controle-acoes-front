import _ from "lodash";
import React from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AuthActions from "src/store/actions/Auth/auth.actions";
import messageService from "./../../services/MessageService";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { Redirect } from "react-router";
import config from "src/config.js";
import { withStyles } from '@material-ui/core/styles';

import back4 from "src/assets/images/bg-images/backElefante.jpg";
import ibolsa from "src/assets/images/bg-images/ibolsa.png";
import icone from "src/assets/images/bg-images/ibolsaIcone.png";
// import instagram from "src/assets/images/icons/instagram.png";
// import whatsapp from "src/assets/images/icons/whatsapp.png";
// import facebook from "src/assets/images/icons/facebook.png";

import "src/assets/scss/style.scss";

class Login extends React.Component {
  state = {
    email: "admin@ibolsa.com.br",
    password: "ibolsa2020",
  };

  canBeSubmitted() {
    const { email, password } = this.state;
    return email.length > 0 && password.length > 0;
  }

  submitForm = (e) => {
    e.preventDefault();
    this.props
      .login(this.state.email, this.state.password)
      .then((e) => {
        if (e.usuarioAutenticado) {
          this.props.history.push(config.defaultPath);
        } else {
          if (e.payload.data.message === "Bad credentials")
            messageService.errorMessage(
              "Não autorizado!",
              "Verifique senha e email."
            );
          else
            messageService.errorMessage(
              e.payload.data.error,
              e.payload.data.message
            );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (event) => {
    this.setState(
      _.set(
        { ...this.state },
        event.target.name,
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
      )
    );
  };

  funcaoNaoImplementada = () =>{
    alert("Função não implementada!")
  }

  render() {
    const { email, password } = this.state;
    if (this.props.isUsuarioAutenticado) return <Redirect to="/empresas" />;

    return (
      <React.Fragment>
        <Breadcrumb />
        <div className="auth-wrapper aut-bg-img-side cotainer-fiuid align-items-stretch">
          <div className="row align-items-center w-100 align-items-stretch bg-white">
            <div
              className="d-none d-lg-flex col-lg-8 aut-bg-img d-flex justify-content-center"
              style={{
                backgroundImage: `url(${back4})`,
                backgroundSize: "cover",
                backgroundAttachment: "initial",
                backgroundPosition: "center",
              }}
            >
              <div className="col-md-11">
                <img
                    style={{ marginTop: '25%'}}
                    src={ibolsa}
                    alt="Bem vindo"
                    width="80%"
                />
                <div className="d-flex" style={{position: 'absolute', bottom: 0, marginBottom: '5%'}}>
                </div>
              </div>
            </div>
            <div className="col-lg-4 align-items-stret h-100 align-items-center d-flex justify-content-center">
              <div className=" auth-content text-center" style={{ marginBottom: '100px' }}>
                <div className="mb-4" style={{ paddingBottom: '30px' }}>
                  <img
                      src={icone}
                      alt="iBolsa S/A"
                      width="50%"
                  />
                </div>
                <h3 className={"mb-4 " + this.props.classes.txtLogin}>Fazer login</h3>
                <Form onSubmit={this.submitForm} name="loginForm">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={email ? email : ""}
                      onChange={this.handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Senha"
                      value={password ? password : ""}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  
                  {/* TODO: salvar os dados do login no localstorage */}
                  <div className="form-group text-left">
                      {/* <div className="checkbox checkbox-fill d-inline" style={{marginRight: '20%'}}>
                          <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2"/>
                          <label htmlFor="checkbox-fill-2" className="cr">Lembrar senha</label>
                      </div> */}
                      <div className="d-inline">
                          <label htmlFor="checkbox-fill-2" className="cr"><div style={{color: '#297fc7', cursor: 'pointer'}}  onClick={this.funcaoNaoImplementada}>Esqueceu sua senha?</div></label>
                      </div>
                  </div>

                  <Button
                    style={{fontSize: 17, fontWeight: 'bold', backgroundColor: '#297fc7'}}
                    disabled={!this.canBeSubmitted()}
                    variant="primary"
                    type="submit"
                    block
                  >
                    Entrar
                  </Button>
                </Form>
              </div>
              <div className={this.props.classes.formRodape}>
                <div style={{color: '#999', cursor: 'pointer'}}  onClick={this.funcaoNaoImplementada}>Contato</div>
                <div style={{color: '#297fc7', cursor: 'pointer'}}  onClick={this.funcaoNaoImplementada} >Criar conta</div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      login: AuthActions.login,
    },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    isUsuarioAutenticado: state.auth.usuarioAutenticado,
  };
};

const styles = {
  txtLogin: {
    fontFamily: 'Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif',
    fontSize: '35px'
  },
  formRodape: {
    width: '85%',
    fontSize: '18px',
    position: 'absolute',
    bottom: 0,
    marginBottom: '8%',
    display: 'flex', 
    justifyContent: 'space-between'
  }
};

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login));
