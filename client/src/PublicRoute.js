import React from 'react';
import {Route, Navigate, Redirect} from 'react-router-dom';
import { useGoogleAuth } from "./GoogleLogin";

const PublicRouter = ({component: Component, ...rest}) => {

    const { isSignedIn } = useGoogleAuth();

    return (
        <div>
            <Route {...rest} render={props => (
                !isSignedIn ?
                    <Component {...props} /> :
                    <Navigate to="/home" />
            )} />
        </div>
    );
};

export default PublicRouter;
