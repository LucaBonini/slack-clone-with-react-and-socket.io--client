import React from "react";
import { Route, Redirect } from "react-router-dom";
import { chatPath } from '../../../config'

let authenticated = localStorage.getItem('chatToken')

export const PrivateRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={ (props) =>
        authenticated ? 
        <React.StrictMode>
          <Component {...props} /> 
        </React.StrictMode> : <Redirect to={chatPath || '/'} />
      }
    />
  )};
  

export default PrivateRoute;