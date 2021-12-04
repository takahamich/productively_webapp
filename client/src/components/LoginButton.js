import React from 'react';
import { useGoogleAuth } from '../GoogleLogin';

const LoginButton = () => {

    const { signIn } = useGoogleAuth();

    return (
        <button onClick={signIn}>Login with Google</button>
    );
};

export default LoginButton;