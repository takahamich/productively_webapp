import React, {useState} from 'react';
import styled from "styled-components";
import UpdateTask from './ModifyTask';
import Checkbox from './Checkbox';
import Popup from './Popup';
import Task from "./Task";

function TaskCard({id, taskName, deadline, startDate, startTime, predictHours, predictMins, priority, difficulty}) {
    const [checked, setChecked] = React.useState(false);
    const [toggle, setToggle] = useState(false);
    const [actualTime, setActualTime] = useState();

    let pstring = '';
    if (priority == 3) {
        pstring = "High priority";
    } else if (priority == 2) {
        pstring = "Medium priority";
    } else {
        pstring = "Low priority";
    }

    function handleCheck() {
        setChecked(!checked);
    }

    function handleOnClick() {
        setToggle(!toggle);
    }

    function updateActualTime() {
        const data = {
            actualTime: actualTime
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:8080/tasks/' + id, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                console.log(response.text);
            }).catch(err => {
                console.log(err);
            });
    }

    return (
        <TaskWrapper>
            {checked && <Popup
                content={<>
                    <form>
                        <h3>Good Job!</h3>
                        <label>
                            Amount of time taken:
                            <input type="text" onChange={e => setActualTime(e.target.value)} />
                        </label>
                        <br />
                        <button onClick={updateActualTime}>Submit</button>
                    </form>
                </>}
                handleClose={handleCheck}
            />}
            {
                (() => {
                    if (priority == 3)
                        return <HighPriorityBar />
                    else if (priority == 2)
                        return <MedPriorityBar />
                    else
                        return <LowPriorityBar />
                })()
            }
            <TaskBox onClick={handleOnClick}>
                <label>
                    <Checkbox
                        checked={checked}
                        onClick={handleCheck}
                    />
                </label>
                <p style={taskStyle}>{taskName}</p>
                <p style={durationStyle}>{predictHours}h {predictMins}m</p>
            </TaskBox>
            {toggle &&
                <UpdateTask
                    id={id}
                    name={taskName}
                    predictHours={predictHours}
                    predictMins={predictMins}
                    priority={pstring}
                    difficulty={difficulty}
                    deadline={deadline}
                    startDate={startDate}
                    startTime={startTime}
                />
            }
        </TaskWrapper>
        )
}

export default TaskCard;

const TaskWrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 2em;
    width: 60%;
`

const TaskBox = styled.div`
    background: #fff;
    border-radius: 42px;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    padding: 0.5em 0 0.5em 1.5em;
`

const HighPriorityBar = styled.div`
    background: #E07A7A;
    width: 8px;
    margin-right: 1em;
`

const MedPriorityBar = styled(HighPriorityBar)`
    background: #E8C067;
`

const LowPriorityBar = styled(HighPriorityBar)`
    background: #6FB3B8;
`

const taskStyle = {
    color: '#1B3D4A',
    position: 'relative',
    order: 1,
}

const durationStyle = {
    color: '#CECECE',
    order: 2,
    marginLeft: 'auto',
    paddingRight: '1.5em'
}