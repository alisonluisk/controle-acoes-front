import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as AuthActions from "src/store/actions/Auth/auth.actions";
import messageService from "src/App/services/MessageService.js";

import DEMO from "src/store/constant";
import AvatarDefault from "src/assets/images/user/avatar-2.jpg";

class NavRight extends Component {
  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  updateEmpresaLogada = (e, user, emp) => {
    e.preventDefault();
    this.props
      .setEmpresaLogada(user, emp)
      .then((e) => {
        window.location.reload();
      })
      .catch((err) => {
        messageService.errorMessage("Ocorreu um erro.", e.payload.data.message);
      });
  };

  render() {
    const usuarioLogado = this.props.usuarioLogado;
    const empresaLogada = this.props.empresaLogada;
    const empresas = usuarioLogado.empresasAcesso;
    const menuItems = [];
    if (empresas) {
      for (let emp of empresas) {
        menuItems.push(
          <li key={emp.codigo}>
            <Dropdown.Item
              onClick={(e) => {
                this.updateEmpresaLogada(e, usuarioLogado, emp);
              }}
              href={DEMO.BLANK_LINK}
              className="dropdown-item"
            >
              {emp.razaoSocial}
            </Dropdown.Item>
          </li>
        );
      }
    }

    return (
      <React.Fragment>
        <ul className="navbar-nav ml-auto">
          <li>
            <Dropdown alignRight={!this.props.rtlLayout}>
              <Dropdown.Toggle variant={"link"} id="dropdown-basic">
                {empresaLogada ? empresaLogada.nomeFantasia : ""}
              </Dropdown.Toggle>
              <ul>
                <Dropdown.Menu>{menuItems}</Dropdown.Menu>
              </ul>
            </Dropdown>
          </li>
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
                    {usuarioLogado ? usuarioLogado.nome.split(" ")[0] : ""}
                  </span>
                  {/* <a
                    href={DEMO.BLANK_LINK}
                    onClick={this.logout}
                    className="dud-logout"
                    title="Logout"
                  >
                    <i className="feather icon-log-out" />
                  </a> */}
                </div>
                <ul className="pro-body">
                  <li>
                    <a href={DEMO.BLANK_LINK} className="dropdown-item">
                      <i className="feather icon-settings" /> Meu perfil
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
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logout: AuthActions.logout,
      setEmpresaLogada: AuthActions.setEmpresaLogada,
    },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    usuarioLogado: state.auth.usuario,
    empresaLogada: state.auth.empresaLogada,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavRight);
