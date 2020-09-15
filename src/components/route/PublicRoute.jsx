import React from "react";
import { Route, Redirect } from "react-router-dom";
import { chatPath } from "../../../config";

// let authenticated = localStorage.getItem('chatToken')
import { useSelector } from 'react-redux'

export const PublicRoute = ({
    component: Component,
    ...rest
    }) => {
        let authenticated = useSelector(state => {
            console.log(state, 'STATE')
            return state.auth
          })
        return (
        <Route
            {...rest}
            component={props =>
                authenticated ? <Redirect to={`${chatPath}/home`} /> : <Component {...props} />
            }
        />
    )};

export default PublicRoute;


  
