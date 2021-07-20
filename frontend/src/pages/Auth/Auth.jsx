import React from "react";
import { Route } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";

const Auth = () => {
  return (
    <div className="auth__content">
      <Route exact path="/signin" component={LoginForm } />
      <Route exact path="/signup" component={RegisterForm} />
    </div>
  );
};

export default Auth;
