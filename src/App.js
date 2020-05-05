import React, { useEffect, useState } from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import India from "./India";
import States from "./States";

function App() {
  return (
    <div className="main">
      <br />
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/india" exact component={India} />
          <Route path="/india/:statee" component={States} />
        </Switch>
      </Router>
      <br />
    </div>
  );
}

export default App;
