import React from 'react';
import './App.css';
import Login from "./Login";
import {Route, Router, Switch} from "react-router-dom";

const Dashboard = (props) => {
  return (
    <section>
      <h3>Successfully Logged In</h3>
    </section>
  )
};

function App() {
  return (
    <div className="App">
        <Switch>
          <Route path="/dashboard" exact component={Dashboard}/>
          <Route path="/" component={Login}/>
        </Switch>
    </div>
  );
}

export default App;
