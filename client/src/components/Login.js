import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Login.css';

async function loginUser(credentials) {
    return fetch('https://moose-app-backend.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        setToken(token);
    }

    return(
        <div className="login-wrapper">
            <div className="login-headers">
                <h1>Hi! It's nice to see you here!</h1>
                <h2>please log in to access web-app.</h2>
            </div>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Username</p>
              <input type="text" onChange={e => setUserName(e.target.value)} />
            </label>
            <label>
              <p>Password</p>
              <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;