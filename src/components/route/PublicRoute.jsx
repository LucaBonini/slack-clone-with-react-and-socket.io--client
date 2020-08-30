import React from "react";
import { Route, Redirect } from "react-router-dom";

let authenticated = localStorage.getItem('chatToken')

export const PublicRoute = ({
    component: Component,
    ...rest
    }) => (
        <Route
            {...rest}
            component={props =>
                authenticated ? <Redirect to="/home" /> : <Component {...props} />
            }
        />
    );

export default PublicRoute;


  
