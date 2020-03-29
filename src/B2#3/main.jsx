import React, { Component } from "react";
import Navbar from "./navbar";
import Show from "./show";
import { Switch, Route, Redirect } from "react-router-dom";
import NewStudent from "./newStud";
import EditStudent from "./editStudent";

class Main extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar />
        <div>
          <Switch>
            <Route path="/student/:name" component={EditStudent} />
            <Route path="/allStudent" render={props => <Show {...props} />} />
            <Route path="/newStudent" component={NewStudent} />
            <Redirect to="/allStudent" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Main;
