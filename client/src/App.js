import logo from './logo.svg';
// import './App.css';
import './Calendar.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components'

function App() {
  return (
    <Wrapper>
      <Wrapper2>   <Calendar/> </Wrapper2>
    
      <p>happy</p>
      <Button>SUBMIT MEEE</Button>
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
const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`

export default App;
