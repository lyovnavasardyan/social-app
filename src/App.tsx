import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './Register/registerForm';
import Greeting from './Greeting/greeting.tsx';
import LogedIn from './LogedIn/logedInPage.tsx';
import LogIn from './LogIn/login.tsx';
import './App.css';

function App() {
  return (
   <Router>
    <Routes>
      <Route path = '/' element = {<RegisterForm/>}/>
      <Route path = '/registered' element = {<Greeting/>} />
      <Route path = '/logedin' element = {<LogedIn/>}/>
      <Route path = '/login' element = {<LogIn/>}/>
    </Routes>
   </Router>
  );
}

export default App;
