import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
//import { Redirect } from 'react-router';
import './App.css';
import Calendar from "./routes/Calendar";
import Tasks from "./routes/Tasks";
import Tracker from "./routes/Tracker";
import Resources from "./routes/Resources";
import Login from "./components/Login";
import { myContext } from './Context'
import PrivateRoute2 from "./PrivateRoutes";
import PublicRouter from "./PublicRoute";

function AppTest() {
    //const user = useContext(myContext);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                   <Route path="/home" element={
                        <PrivateRoute2>
                            <Calendar />
                        </PrivateRoute2>
                    }/>
                    <Route path="/tasks" element={
                        <PrivateRoute2>
                            <Tasks />
                        </PrivateRoute2>
                    }/>
                    <Route path="/tracker" element={
                        <PrivateRoute2>
                            <Tracker />
                        </PrivateRoute2>
                    }/>
                    <Route path="/resources" element={
                        <PrivateRoute2>
                            <Resources />
                        </PrivateRoute2>
                    }/>
                    <Route path="/" element={
                        <PublicRouter>
                            <Login />
                        </PublicRouter>
                    } />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default AppTest;
