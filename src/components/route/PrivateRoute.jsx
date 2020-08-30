import React from "react";
import { Route, Redirect } from "react-router-dom";

let authenticated = localStorage.getItem('chatToken')

export const PrivateRoute = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={ (props) =>
      authenticated ? 
      <React.StrictMode>
        <Component {...props} /> 
      </React.StrictMode> : <Redirect to="/" />
    }
  />
);
  

export default PrivateRoute;