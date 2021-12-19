import React from "react";
import styled from "styled-components";
import {Dropdown, Option} from "./Dropdown";
import TextField from '@material-ui/core/TextField';
import {useState } from "react";
//import {creator} from '../App'


function UpdateTask({id, name, deadline, priority, predictHours, predictMins, startDate, startTime, difficulty}){
    const [data, setData] = useState({
        id: id,
        taskName: name,
        deadline: deadline,
        priority: priority,
        PredictedTimeHours: predictHours,
        PredictedTimeMinutes: predictMins,
        startDate: startDate,
        startTime: startTime,
        difficulty: difficulty,
    });

    function refreshPage() {
        window.location.href = window.location.href
    }

    function handleChange(e){
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    function submit(e){
        e.preventDefault()
        //console.log('this is the current user email' + creator);
        // const profile = googleUser.getBasicProfile();
        //data.creatorId = creator;

        fetch('https://productively-back-end.herokuapp.com/updateTask/' + id, {
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


        alert("Your task has been updated!")
        refreshPage();

        console.log(data)
    }

    function deleteTask() {
        fetch('https://productively-back-end.herokuapp.com/deleteTask/' + id, {
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
        alert("Your task has been deleted!")
        refreshPage();
    }

    return (
        <Wrapper>
            <FormTitle>Update Task</FormTitle>
            <FormWrapper id = "form" onSubmit={(e) => submit(e)} action = "/" method = "POST">
                <StyledTitleTextField
                    id="taskName"
                    label="Task name"
                    margin="normal"
                    value={data.taskName}
                    onChange={(e) => handleChange(e)}
                    required
                    fullWidth
                />

                <StyledTextField
                    id="startDate"
                    label="Start date"
                    type="date"
                    margin="normal"
                    value={data.startDate}
                    onChange={(e) => handleChange(e)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                    fullWidth
                />

                <StyledTextField
                    id="startTime"
                    label="Start Time"
                    type="time"
                    value={data.startTime}
                    onChange={(e) => handleChange(e)}
                    required
                    fullWidth
                />

                <StyledTextField
                    id="deadline"
                    label="Task deadline"
                    type="date"
                    margin="normal"
                    value={data.deadline}
                    onChange={(e) => handleChange(e)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                    fullWidth
                />

                <select id="priority" defaultValue={priority} value={data.priority} onChange={(e) => handleChange(e)}
                        style={dropdownStyle}>
                    {/* <Option selected value="Select task priority" /> */}
                    <Option value="Select task priority" disabled></Option>
                    <Option value="Low priority" />
                    <Option value="Medium priority" />
                    <Option value="High priority" />
                </select>
                <br></br>
                <select id="difficulty" defaultValue={difficulty} value={data.difficulty} onChange={(e) => handleChange(e)}
                        style={dropdownStyle}>
                    <Option value="Select difficulty" disabled></Option>
                    <Option value="1 - easiest" />
                    <Option value="2" />
                    <Option value="3" />
                    <Option value="4" />
                    <Option value="5 - hardest" />
                </select>
                <br></br>
                <StyledTextField
                    id="PredictedTimeHours"
                    label="Predicted Time in Hours"
                    placeholder= "hours"
                    margin="normal"
                    value={data.PredictedTimeHours}
                    onChange={(e) => handleChange(e)}
                    required
                    fullWidth/>
                <StyledTextField
                    id="PredictedTimeMinutes"
                    label="Predicted Time in Minutes"
                    placeholder= "minutes"
                    margin="normal"
                    value={data.PredictedTimeMinutes}
                    onChange={(e) => handleChange(e)}
                    required
                    fullWidth/>

                {/* <TextField
                    id="ActualTime"
                    label=" Actual: Time in hours, seconds"
                    margin="normal"
                    placeholder=" Actual: How much time did this task actually take you?"
                    value={data.ActualTime}
                    onChange={(e) => handleChange(e)}
                    fullWidth/>

                <label for="start">Start Time</label>
                <input type="time" id="start" name="start"
                    value={data.start}
                    onChange={(e) => handleChange(e)}></input>

                <label for="end">End Time</label>
                <input type="time" id="end" name="end"
                 value={data.end}
                onChange={(e) => handleChange(e)}></input> */}

                {/*<ButtonWrapper>
                    <button type="button" onClick={onClick}>Delete</button>
                </ButtonWrapper>*/}
                <ButtonWrapper>
                    <button type="submit" style={submitButton}>Update Task</button>
                    <DeleteButton onClick={deleteTask}>Delete Task</DeleteButton>
                </ButtonWrapper>
            </FormWrapper>
        </Wrapper>
    )
}

export default UpdateTask;

const Wrapper = styled.div`
    position: fixed;
    right: 0px;
    width: 25vw;
    height: 100vh;
    background: #fff;
    transition: width 1s;
    overflow: scroll;
    right: 0;
    top: 0;
`

const FormWrapper = styled.form`
    max-width: 100%;
    height: 100%;
    border-radius: 10px;
    padding: 0 3em 0 3em;
`

const ButtonWrapper = styled.div`
    margin-top: 2em;
    width: 100%;
`

const FormTitle = styled.p`
    color: #1B3D4A;
    font-size: 1.5em;
    margin: 2em 0 1em 2em;
`

const dropdownStyle = {
    background: '#fff',
    border: 'none',
    padding: '10px',
    width: '100%',
    margin: '0.25em 0 0.25em 0',
    color: '#1B3D4A',
    fontFamily: 'Proxima Nova',
    fontSize: '1em',
    textTransform: 'uppercase',
    borderRadius: '25px'
}

const submitButton = {
    background: '#377F87',
    boxShadow: 'none',
    border: 'none',
    width: '100%',
    height: '3em',
    color: '#fff',
    fontFamily: 'Proxima Nova',
    fontSize: '1em',
    textTransform: 'uppercase',
    borderRadius: '25px'
}

const DeleteButton = styled.button `
    background: #E07A7A;
    border: none;
    width: 100%;
    height: 3em;
    color: #fff;
    font-family: 'Proxima Nova';
    font-size: 1em;
    text-transform: uppercase;
    border-radius: 25px;
    margin-top: 1em;
`

const StyledTitleTextField = styled(TextField)`
    & .MuiOutlinedInput-notchedOutline {
        border: none;
    }
    & .MuiInputLabel-root {
        font-family: 'Proxima Nova';
        font-size: 1em;
        text-transform: uppercase;
        color: #9B9B9B;
    }
    & .MuiOutlinedInput-root {
        font-family: 'Proxima Nova';
        font-size: 1.5em;
        text-transform: uppercase;
        color: #1B3D4A;
    }
`

const StyledTextField = styled(TextField)`
    & .MuiOutlinedInput-notchedOutline {
        border: none;
    }
    & .MuiInputLabel-root, .MuiFormLabel-root {
        font-family: 'Proxima Nova';
        font-size: 1em;
        text-transform: uppercase;
        color: #9B9B9B;
    }
    & .MuiOutlinedInput-root {
        font-family: 'Proxima Nova';
        font-size: 1em;
        text-transform: uppercase;
        color: #1B3D4A;
    }
   & .MuiFormControl-root, .MuiTextField-root, .MuiFormControl-marginNormal, .MuiInputBase-root {
        margin-top: 0px!important;
        margin-bottom: 0px!important;
   }
`