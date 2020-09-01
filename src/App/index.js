import React, { Component, Suspense } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Loadable from "react-loadable";
import "../../node_modules/font-awesome/scss/font-awesome.scss";

import Loader from "./layout/Loader";
import ScrollToTop from "./layout/ScrollToTop";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import jwtService from "src/App/services/jwtService.js";

const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader,
});

// const Login = Loadable({
//   loader: () => import("./../App/views/Login/Login"),
//   loading: Loader,
// });

class App extends Component {
  constructor(props) {
    super(props);
    jwtService.init();
  }

  render() {
    return (
      <React.Fragment>
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <Switch>
              {/* <Route path="/login" component={Login} /> */}
              <Route
                render={(props) =>
                  // this.props.isUsuarioAutenticado ? (
                    <AdminLayout {...props} />
                  // ) : (
                  //   <Redirect to="/login" />
                  // )
                }
              />
            </Switch>
          </Suspense>
        </ScrollToTop>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isUsuarioAutenticado: state.auth.usuarioAutenticado,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
