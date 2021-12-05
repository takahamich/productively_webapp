import React, {useContext} from 'react';
import {Route, Navigate, Redirect} from 'react-router-dom';
import {myContext} from "./Context";

const PublicRouter = ({children}) => {
    const user = useContext(myContext);

    if(user){
        return <Navigate to="/home" />;
    } else {
        return children;
    }
};

export default PublicRouter;
