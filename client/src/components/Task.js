import React from "react";
import styled from "styled-components";
import {Dropdown, Option} from "./Dropdown";
import TextField from '@material-ui/core/TextField';
import {useState } from "react";
import App from '../App'
import {creator} from '../App'


function Task({onClick }){
    const [data, setData] = useState({
        taskName: "",
        deadline: "",
        priority: "",
        PredictedTime: "",
        ActualTime: "",
        start:"",
        end:"",
        startDate:"",
        status: "",
        difficulty: "",
        creatorId: "",
    });

    function handleChange(e){
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    function submit(e){
        e.preventDefault()
        console.log('this is the current user email' + creator);
        // const profile = googleUser.getBasicProfile();
        data.creatorId = creator;

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
        e.target.reset();


        alert("Your task has been submitted!")

        console.log(data)

    }

    return (
        <Wrapper>
            <h3>Create a Task:</h3>
            <FormWrapper id = "form" onSubmit={(e) => submit(e)} action = "/" method = "POST">
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

                <select id="status" defaultValue={"Select status"} value={data.status} onChange={(e) => handleChange(e)}>
                    <Option value="Select status" disabled></Option>
                    <Option value="Not started" />
                    <Option value="In Progress" />
                    <Option value="Done" />
                </select>

                <select id="difficulty" defaultValue={"Select difficulty"} value={data.difficulty} onChange={(e) => handleChange(e)}>
                    <Option value="Select difficulty" disabled></Option>
                    <Option value="1 - easiest" />
                    <Option value="2" />
                    <Option value="3" />
                    <Option value="4" />
                    <Option value="5 - hardest" />
                </select>
               
                <TextField
                    id="PredictedTime"
                    label=" Predicted:Time in hours, seconds"
                    margin="normal"
                    placeholder=" Predicted: How much time should this task take you?"
                    value={data.PredictedTime}
                    onChange={(e) => handleChange(e)}
                    required
                    fullWidth/>

                <TextField
                    id="ActualTime"
                    label=" Actual: Time in hours, seconds"
                    margin="normal"
                    placeholder=" Actual: How much time did this task actually take you?"
                    value={data.ActualTime}
                    onChange={(e) => handleChange(e)}
                    fullWidth/>

                <label for="start">Start Time</label>
                <input type="time" id="start" name="start"
                    min="09:00" max="18:00" value={data.start}
                    onChange={(e) => handleChange(e)}></input>

                <label for="end">End Time</label>
                <input type="time" id="end" name="end"
                min="09:00" max="18:00" value={data.end}
                onChange={(e) => handleChange(e)}></input>

                <label for="startDate">Start date </label>
                <input type="date" id="startDate" name="trip-start"
                    value="2018-07-22"
                    min="2018-01-01" max="2018-12-31" value={data.startDate}
                    onChange={(e) => handleChange(e)}></input>

                <ButtonWrapper>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={onClick}>Done</button>
                </ButtonWrapper>

                <ButtonWrapper>
                    <button type="button" onClick={onClick}>Delete</button>
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
