import React from "react";
import { Route, Redirect } from "react-router-dom";
import { chatPath } from "../../../config";

let authenticated = localStorage.getItem('chatToken')

export const PublicRoute = ({
    component: Component,
    ...rest
    }) => {
        return (
        <Route
            {...rest}
            component={props =>
                authenticated ? <Redirect to={`${chatPath}/home`} /> : <Component {...props} />
            }
        />
    )};

export default PublicRoute;


  
