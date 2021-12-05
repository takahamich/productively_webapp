import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Calendar from "./routes/Calendar";
import Tasks from "./routes/Tasks";
import Tracker from "./routes/Tracker";
import Resources from "./routes/Resources";
import Login from "./components/Login";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoute";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={
                        <PrivateRoute>
                            <Calendar />
                        </PrivateRoute>
                    }/>
                    <Route path="/tasks" element={
                        <PrivateRoute>
                            <Tasks />
                        </PrivateRoute>
                    }/>
                    <Route path="/tracker" element={
                        <PrivateRoute>
                            <Tracker />
                        </PrivateRoute>
                    }/>
                    <Route path="/resources" element={
                        <PrivateRoute>
                            <Resources />
                        </PrivateRoute>
                    }/>
                    <Route path="/" element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default AppTest;
