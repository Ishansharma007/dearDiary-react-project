// eslint-disable-next-line
import Navbar from './components/Navbar'
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
//import { useState } from 'react';
import AlertState from './context/alerts/AlertState';

const App = () => {


  return (
    <>
    <AlertState>
      <NoteState>
        <Router>
          <Navbar />
          <Alert />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
      </AlertState>
    </>
  )
}

export default App;
