import React from 'react';
import styled from "styled-components";

function TaskCard({taskName, duration, priority}) {
    /*const priority = p;
    let priorityColor = '#fff';

    if (priority == 1) {
        priorityColor = '#6FB3B8';
    } else if (priority == 2) {
        priorityColor = '#E8C067';
    } else {
        priorityColor = '#E07A7A';
    }*/

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
            <TaskBox>
                <p style={taskStyle}>{taskName}</p>
                <p style={durationStyle}>{duration}</p>
            </TaskBox>
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