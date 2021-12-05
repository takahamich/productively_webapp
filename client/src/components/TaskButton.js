import React from "react";
import styled from "styled-components";


function TaskButton({onClick}){
    return (
        <Button onClick={onClick}>+</Button>
    )
}

const Button = styled.button`
    background: #377F87;
    border-radius: 50%;
    height: 75px;
    width: 75px;
    border: none;
    font-family: 'Proxima Nova';
    color: #F6F6F2;
    font-size: 55px;
`

export default TaskButton;