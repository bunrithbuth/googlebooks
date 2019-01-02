import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//route pages
import Books from "./pages/Books";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";

//app components
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Books} />
          <Route exact path="/saved" component={Saved} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
