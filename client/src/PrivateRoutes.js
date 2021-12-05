import React, {useContext, useEffect, useState} from 'react';
import {Route, Navigate, Redirect} from 'react-router-dom';
import { useGoogleAuth } from "./GoogleLogin";
import axios from "axios";
import { myContext } from './Context';

function PrivateRoute({children, component: Component, ...rest}) { //component: Component, ...rest

};

export default PrivateRoute;
