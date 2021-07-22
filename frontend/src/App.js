import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import io from "socket.io-client";
import { config } from "./config/config";

const socket = io(config.socketIOUrl);

const App = () => {
  const { isAuth } = useSelector(({ user }) => user);

  return (
    <div className="wrapper">
      <Switch>
        <Route
          path={["/signin", "/signup"]}
          render={() => (isAuth === false ? <Auth /> : <Redirect to="/" />)}
          exact
        />
        <Route
          path="/"
          render={() =>
            isAuth === true ? <Home /> : <Redirect to="/signin" />
          }
        />
      </Switch>
    </div>
  );
};

export default App;
