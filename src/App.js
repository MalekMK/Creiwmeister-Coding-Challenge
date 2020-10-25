import React from "react";
import "./App.css";
import HomePage from "./Components/HomePage";
import ErrorPage from "./Components/ErrorPage";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
