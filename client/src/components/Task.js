import React from "react";
import styled from "styled-components";
import {Dropdown, Option} from "./Dropdown";
import TextField from '@material-ui/core/TextField';
import {useState } from "react";

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: "",
            deadline: "",
            priority: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /*const [data, setData] = useState({
        taskName: "",
        deadline: "",
        priority: ""
    });*/

    handleChange = event => {
        /*const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)*/
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        fetch('http://localhost:8080/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            console.log(response.text);
        }).catch(err => {
            console.log(err);
        });
        alert("Your task has been submitted");
    }

    render() {
        return (
            <Wrapper>
                <h3>Create a Task:</h3>
                <FormWrapper onSubmit={this.handleSubmit}>
                    <TextField
                        name="taskName"
                        label="Task name"
                        margin="normal"
                        value={this.state.value}
                        onChange={this.handleChange}
                        required
                        fullWidth/>
                    <TextField
                        name="deadline"
                        label="Select task deadline"
                        type="date"
                        margin="normal"
                        value={this.state.value}
                        onChange={this.handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}/>

                    <select name="priority" value={this.state.value} onChange={this.handleChange}>
                        {/* <Option selected value="Select task priority" /> */}
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

                    </ButtonWrapper>
                </FormWrapper>

            </Wrapper>

        )
    }
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
