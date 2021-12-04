import React from 'react';
import {Route, Navigate, Redirect} from 'react-router-dom';
import { useGoogleAuth } from "./GoogleLogin";

const PrivateRoute = ({component: Component, ...rest}) => {

    const { isSignedIn } = useGoogleAuth();

    return (
        <div>
            <Route {...rest} render={props => (
                isSignedIn ?
                    <Component {...props} />:
                    <Navigate to="/" />
            )} />
        </div>
    );
};

export default PrivateRoute;
