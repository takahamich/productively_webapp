import React from "react";
import styled from "styled-components";
import {Dropdown, Option} from "./Dropdown";
import TextField from '@material-ui/core/TextField';
import {useState } from "react";

function Task({onClick}){
    const [data, setData] = useState({
        taskName: "",
        deadline: "",
        priority: ""
    });

    function handleChange(e){
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    function submit(e){
        e.preventDefault()

        fetch('http://localhost:8080/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            console.log(response.text);
        }).catch(err => {
            console.log(err);
        });
        alert("Your task has been submitted!")
        console.log(data)

    }

    return (
        <Wrapper>
            <h3>Create a Task:</h3>
            <FormWrapper onSubmit={(e) => submit(e)} action = "/" method = "POST">
                <TextField
                    id="taskName"
                    label="Task name"
                    margin="normal"
                    value={data.taskName}
                    onChange={(e) => handleChange(e)}
                    required
                    fullWidth/>
                <TextField
                    id="deadline"
                    label="Select task deadline"
                    type="date"
                    margin="normal"
                    value={data.deadline}
                    onChange={(e) => handleChange(e)}
                    InputLabelProps={{
                        shrink: true,
                    }}/>

                <select id="priority" defaultValue={"Select task priority"} value={data.priority} onChange={(e) => handleChange(e)}>
                    {/* <Option selected value="Select task priority" /> */}
                    <Option value="Select task priority" disabled></Option>
                    <Option value="Low priority: 1" />
                    <Option value="Medium priority: 2" />
                    <Option value="High priority: 3" />
                </select>
                <button type="submit">Submit</button>
                {/* <Dropdown action="/" id="priority" value={data.priority} onChange={(e) => handleChange(e)}>
                    <Option selected value="Select task priority" />
                    <Option value="Low priority: 1" />
                    <Option value="Medium priority: 2" />
                    <Option value="High priority: 3" />
                </Dropdown> */}
                <ButtonWrapper>
               
                    <button type="button" onClick={onClick}>Done</button>
                </ButtonWrapper>
            </FormWrapper>
            
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

const FormWrapper = styled.form`
    background-color: #e4eaf5;
    padding: 0 10px 0 10px;
    max-width: 100%;
    border-radius: 10px;
`

const ButtonWrapper = styled.div`
    margin-top: 10px;
`
