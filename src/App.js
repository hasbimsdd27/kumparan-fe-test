import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./screen/login";
import Home from "./screen/home";

export default function App() {
  return (
    <div className="min-h-screen w-screen bg-gray-200">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
