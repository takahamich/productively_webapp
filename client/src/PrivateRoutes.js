import React, {useEffect, useState} from 'react';
import {Route, Navigate, Redirect} from 'react-router-dom';
import { useGoogleAuth } from "./GoogleLogin";
import axios from "axios";

const PrivateRoute = ({component: Component, ...rest}) => {
    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        axios.get("https://localhost:8080/getuser", {withCredentials: true}).then(res => { //was slightly diff
            console.log("tried to get user and found: ");
            console.log(res.data);
            if (res.data) {
                setAuthenticated(true);
            } else {
                window.location = '/';
            }
        })
    }, []);

    return (isAuthenticated
        ? <Route {...rest} render={(props) => <Component {...props} />} />
        : <p>{'Loading'}</p>);
    // const { isSignedIn } = useGoogleAuth();
    //
    // return (
    //     <div>
    //         <Route {...rest} render={props => (
    //             isSignedIn ?
    //                 <Component {...props} />:
    //                 <Navigate to="/" />
    //         )} />
    //     </div>
    // );
};

export default PrivateRoute;
