import React, { Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CFade } from "@coreui/react";

import AuthenticationAPI from "../api/authentication.api";

// routes config
import routes from "../routes";
import { Container } from "@material-ui/core";

const PrivateRoute = ({
  component: Component,
  IsLogged,
  setIsLogged,
  ...rest
}) => {
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await AuthenticationAPI.checkLogged();
        if ("DA_DANG_NHAP" === res.message) return setIsLogged(true);
        else setIsLogged(false);
      } catch (error) {
        setIsLogged(false);
        console.log("TheContent AuthenticationAPI ERR");
      }
    };
    fetchAPI();
  }, [setIsLogged]);

  return (
    <Route
      {...rest}
      render={(props) =>
        IsLogged === true ? (
          <CFade>
            {" "}
            <Component {...props} />
          </CFade>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = (props) => {
  const { IsLogged, setIsLogged } = props;

  return (
    <main
    //className="c-main"
    >
      <Container disableGutters maxWidth={false}>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <PrivateRoute
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    IsLogged={IsLogged}
                    setIsLogged={setIsLogged}
                    component={route.component}
                  />
                )
              );
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </Container>
    </main>
  );
};

export default React.memo(TheContent);
