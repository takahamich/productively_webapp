import logo from './logo.svg';
// import './App.css';
import './Calendar.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components'
import {Dropdown, Option} from "./components/Dropdown";

function App() {
  return (
    <Wrapper>
      <Wrapper2>   <Calendar/> </Wrapper2>
        <TaskbarWrapper>
            <p>happy</p>
            <Dropdown action="/">
                <Option selected value="Select task priority" />
                <Option value="Low priority: 1" />
                <Option value="Medium priority: 2" />
                <Option value="High priority: 3" />
            </Dropdown>
            <Button>SUBMIT MEEE</Button>
        </TaskbarWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify_content: center;
  padding: 4em;
  height: 100vh;
  background: papayawhip;
`;
const Wrapper2 = styled.section`
  
 
  padding: 4em;
  background: black;

`;

const TaskbarWrapper = styled.section`
    display: flex;
    flex-direction: column;
    margin: 0 1em;
`;

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`

export default App;
