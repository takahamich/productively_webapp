import React, { useContext } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Calendar from "./routes/Calendar";
import Tasks from "./routes/Tasks";
import Tracker from "./routes/Tracker";
import Resources from "./routes/Resources";
import Login from "./components/Login";
import { myContext } from './Context'
import PrivateRoute from "./PrivateRoutes";
//might not need after every single route

function AppTest() {
    const userObject = useContext(myContext);
    console.log(userObject);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Calendar />} />
                    {/*{*/}
                    {/*    userObject ? (*/}
                    {/*        <Route path="/home" element={<Calendar />} />*/}
                    {/*    ) : (*/}
                    {/*        <Route path="/" element={<Login />}/>*/}
                    {/*    )*/}
                    {/*}*/}
                    <Route path="/tasks" element={<Tasks />} />
                    {/*{*/}
                    {/*    userObject ? null : (*/}
                    {/*        <Route path="/" element={<Login />}/>*/}
                    {/*    )*/}
                    {/*}*/}
                    <Route path="/tracker" element={<Tracker />} />
                    {/*{*/}
                    {/*    userObject ? null : (*/}
                    {/*        <Route path="/" element={<Login />}/>*/}
                    {/*    )*/}
                    {/*}*/}
                    <Route path="/resources" element={<Resources />} />
                    {/*{*/}
                    {/*    userObject ? null : (*/}
                    {/*        <Route path="/" element={<Login />}/>*/}
                    {/*    )*/}
                    {/*}*/}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default AppTest;
