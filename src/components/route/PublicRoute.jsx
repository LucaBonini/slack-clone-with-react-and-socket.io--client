import React from "react";
import { Route, Redirect } from "react-router-dom";
import { chatPath } from "../../../config";
import { useSelector } from 'react-redux'

const PublicRoute = ({
  component: Component,
  ...rest
}) => {
  let authenticated = useSelector(state => state.auth)
  return (
    <Route
      {...rest}
      component={props =>
        authenticated ? <Redirect to={`${chatPath}/home`} /> : <Component {...props} />
      }
    />
  )
};

export default PublicRoute;
    
    
    
    