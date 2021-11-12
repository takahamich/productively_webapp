import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom"; //,Routes
import './index.css';
import App from './App';
import Tasks from './routes/Tasks';
import Tracker from './routes/Tracker';
import Resources from './routes/Resources';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="tracker" element={<Tracker />} />
              <Route path="resources" element={<Resources />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
