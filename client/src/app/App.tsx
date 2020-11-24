import React from "react";
import "./App.css";
import { NavbarItem } from "../components/navabar";
import { ListBook } from "../components/listBook";
import { Container } from "react-bootstrap";
import { createBrowserHistory } from "history";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { ListCategory } from "../components/listCaterogy";
const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <div>
        <NavbarItem />
        <Container>
          <Switch>
            <Route path="/book" component={ListBook} />
            <Route path="/category" component={ListCategory} />
            <Redirect from="/" to="/book" />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
