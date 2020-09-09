import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import "./scss/style.scss";
import Login from "./views/pages/login/Login";
import Register from "./views/pages/register/Register";
import Page404 from "./views/pages/page404/Page404";
import Page500 from "./views/pages/page500/Page500";
import TheLayout from "./containers/TheLayout";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
// const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// // Pages
// const Login = React.lazy(() => import("./views/pages/login/Login"));
// const Register = React.lazy(() => import("./views/pages/register/Register"));
// const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
// const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsLogged: true,
    };
  }

  setIsLogged = (IsLogged) => {
    this.setState({
      IsLogged: IsLogged,
    });
  };

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => (
                <Login setIsLogged={this.setIsLogged} {...props} />
              )}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={(props) => (
                <TheLayout
                  IsLogged={this.state.IsLogged}
                  setIsLogged={this.setIsLogged}
                  {...props}
                />
              )}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
