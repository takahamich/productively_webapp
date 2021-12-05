import React, {useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';
import { myContext } from './Context';


function PrivateRoute({children}) { //children
    const user = useContext(myContext);
    if(user){
        return children;
    } else {
        return <Navigate to="/" />
    }


    // return (
    //     ((user!=null) ? children : <Navigate to="/" />)
    // );

}

export default PrivateRoute;
