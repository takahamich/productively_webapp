import React, {useState} from 'react';
import styled from "styled-components";
import UpdateTask from './ModifyTask';
import Checkbox from './Checkbox';
import Task from "./Task";

function TaskCard({id, taskName, duration, priority}) {
    const [checked, setChecked] = React.useState(false);
    const [toggle, setToggle] = useState(false);

    function handleCheck() {
        setChecked(!checked);
    }

    function handleOnClick() {
        setToggle(!toggle);
    }

    return (
        <TaskWrapper>
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
                <p style={durationStyle}>{duration}</p>
            </TaskBox>
            {toggle && <UpdateTask name={taskName} PredictedTime={duration} priority={priority}/>}
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