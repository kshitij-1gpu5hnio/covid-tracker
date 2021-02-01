import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/core/Home";
import State from "./components/core/State";
import About from "./components/core/About";
import "./styles/styles.css";

render(
  <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/state" exact component={State} />
        <Route path="/about" exact component={About} />
      </Switch>
  </Router>,
  // eslint-disable-next-line no-undef
  document.getElementById("app")
);
