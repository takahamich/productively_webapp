import React from "react";
import styled from "styled-components";


function TaskButton({onClick}){
    return (
        <Button onClick={onClick}>Create Task</Button>
    )
}

const Button = styled.button`
    display:inline-block;
    padding:0.35em 1.2em;
    border:0.1em solid black;
    margin:0 0.3em 0.3em 0;
    border-radius:0.12em;
    box-sizing: border-box;
    text-decoration:none;
    font-family:'Roboto',sans-serif;
    font-weight:300;
    color:black;
    text-align:center;
    transition: all 0.1s;
    &:hover {
        color:#000000;
        background-color:pink;
      }
`;

export default TaskButton;