import React from "react";
import { Route, Redirect } from "react-router-dom";
import { chatPath } from '../../../config'

import { useSelector } from 'react-redux'


const PrivateRoute = ({
  component: Component,
  ...rest
}) => {
  let authenticated = useSelector(state => state.auth)
  return (
    <Route
      {...rest}
      component = {(props) =>
        authenticated ? 
        <React.StrictMode>
          <Component {...props} /> 
        </React.StrictMode> : <Redirect to={chatPath || '/'} />
      }
    />
  )
};

export default PrivateRoute;