import React from "react";
import styled from "styled-components";

function Task({onClick}){
    return (
        <Wrapper>
            <h3>Create your Tasks by filling in the fields below</h3>
            <button onClick={onClick}>Submit</button>
        </Wrapper>

    )
}

export default Task;

const Wrapper = styled.div`
    position: absolute;
    right: 0px;
    width: 385px;
    height: 100vh;
    background-color: rgb(204, 213, 227);
    transition: width 1s;
    padding: 5px;

`

