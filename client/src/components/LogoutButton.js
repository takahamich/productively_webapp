import React from 'react';
import { useGoogleAuth } from '../GoogleLogin';

const LogoutButton = () => {
    const { signOut } = useGoogleAuth();

    return (
        <button onClick={signOut}>Logout</button>
    );
};

export default LogoutButton;

