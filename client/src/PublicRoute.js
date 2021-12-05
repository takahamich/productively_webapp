import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {myContext} from "./Context";

const PublicRoute = ({children}) => {
    const user = useContext(myContext);

    if(user){
        return <Navigate to="/home" />;
    } else {
        return children;
    }
};

export default PublicRoute;
