import React, { createContext, useEffect, useState, useMemo, useContext } from 'react'
import axios from 'axios';
//import { AxiosResponse } from 'axios';

export const myContext = createContext({});
export default function Context(props) { //props: any

    const [userObject, setUserObject] = useState(null); //useState<any>();

    useEffect(() => {
        axios.get("https://productively-back-end.herokuapp.com/getuser", {withCredentials: true}).then(res => { //was slightly diff
            if (res.data) {
                setUserObject(res.data);
            } else {
                setUserObject(null);
            }
        })
    }, [])

    return (
        <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    )
}

//export const useMyContext = () => useContext(myContext);