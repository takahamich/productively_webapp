import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
//import { AxiosResponse } from 'axios';

export const myContext = createContext({});
export default function Context(props) { //props: any

    const [userObject, setUserObject] = useState(); //useState<any>();

    useEffect(() => {
        axios.get("https://localhost:8080/getuser", { withCredentials: true }).then(res => { //was slightly diff
            console.log(res);
            if (res.data) {
                setUserObject(res.data);
            }
        })
    }, [])
    return (
        <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    )
}