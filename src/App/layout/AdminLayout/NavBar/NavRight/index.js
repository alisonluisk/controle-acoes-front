import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as AuthActions from "src/store/actions/Auth/auth.actions";
import usuarioService from "src/App/services/Usuario/UsuarioService.js";
import DEMO from "src/store/constant";
import AvatarDefault from "src/assets/images/user/avatar-2.jpg";
import AlterarSenhaModal from "src/App/views/cadastros/Usuario/dialogs/AlterarSenhaModal";

class NavRight extends Component {
  state = {
    showAlterarSenha: false
  };

  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  openCloseModalAlterarSenha = (value) => {
    this.setState({showAlterarSenha: value});
  }

  openAlterarSenha = () => {
    this.openCloseModalAlterarSenha(true);
  }

  alterarSenha = async (dados) => {
    usuarioService.alterarSenha(dados).then(data=>{
      this.openCloseModalAlterarSenha(false);
    })
  }

  render() {
    const usuarioLogado = this.props.usuarioLogado;
    const showAlterarSenha = this.state.showAlterarSenha;
    
    return (
      <React.Fragment>
        <ul className="navbar-nav ml-auto">
          <li>
            <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
              <Dropdown.Toggle variant={"link"} id="dropdown-basic">
                <i className="icon feather icon-settings" />
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight className="profile-notification">
                <div className="pro-head">
                  <img
                    src={
                      usuarioLogado.linkAvatar
                        ? usuarioLogado.linkAvatar
                        : AvatarDefault
                    }
                    className="img-radius"
                    alt="User Profile"
                  />
                  <span>
                    {usuarioLogado ? usuarioLogado.nome : ""}
                  </span>
                </div>
                <ul className="pro-body">
                  <li>
                    <a href={DEMO.BLANK_LINK} className="dropdown-item" onClick={this.openAlterarSenha}>
                      <i className="feather icon-lock" /> Redefinir senha
                    </a>
                  </li>
                  <li>
                    <a
                      href={DEMO.BLANK_LINK}
                      onClick={this.logout}
                      className="dropdown-item dud-logout"
                      title="Deslogar"
                    >
                      <i className="feather icon-log-out" /> Sair
                    </a>
                  </li>
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        <AlterarSenhaModal
          usuario={usuarioLogado}
          showModal={showAlterarSenha} 
          closeModal={(e) =>this.openCloseModalAlterarSenha(false)}
          salvar={this.alterarSenha}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logout: AuthActions.logout
    },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    usuarioLogado: state.auth.usuario
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavRight);
