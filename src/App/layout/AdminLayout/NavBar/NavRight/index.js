import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as AuthActions from "src/store/actions/Auth/auth.actions";

import DEMO from "src/store/constant";
import AvatarDefault from "src/assets/images/user/avatar-2.jpg";

class NavRight extends Component {
  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    const usuarioLogado = this.props.usuarioLogado;
    
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
