import React from "react";
import styled from "styled-components";
import {Dropdown, Option} from "./Dropdown";
import TextField from '@material-ui/core/TextField';

function Task({onClick}){
    return (
        <Wrapper>
            <h3>Create a Task:</h3>
            <FormWrapper>
                <TextField
                    id="task-name"
                    label="Task name"
                    margin="normal"
                    required
                    fullWidth
                />
                <TextField
                    id="deadline"
                    label="Select task deadline"
                    type="date"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}/>
                <Dropdown action="/">
                    <Option selected value="Select task priority" />
                    <Option value="Low priority: 1" />
                    <Option value="Medium priority: 2" />
                    <Option value="High priority: 3" />
                </Dropdown>
            </FormWrapper>
            <ButtonWrapper>
                <button onClick={onClick}>Submit</button>
            </ButtonWrapper>
        </Wrapper>

    )
}

export default Task;

const Wrapper = styled.div`
    position: absolute;
    right: 0px;
    width: 20%;
    height: 100vh;
    background-color: rgb(204, 213, 227);
    transition: width 1s;
    padding: 10px;

`

const FormWrapper = styled.div`
    background-color: #e4eaf5;
    padding: 0 10px 0 10px;
    max-width: 100%;
    border-radius: 10px;
`

const ButtonWrapper = styled.div`
    margin-top: 10px;
`
