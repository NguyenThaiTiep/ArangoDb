import React from "react";
import "./App.scss";
import { NavbarItem } from "../components/navbar";
import { ListBook } from "../components/listBook";
import { Container } from "react-bootstrap";
import { createBrowserHistory } from "history";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { ListCategory } from "../components/listCaterogy";
import { ListBill } from "../components/listBill";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home } from "./page/home";
import { Category } from "./page/Category";
import { Bill } from "./page/Bill";
import { Compare } from "./page/Compare";

const history = createBrowserHistory();

function App() {
  return (
    <div>
      <Router history={history}>
        <div>
          <NavbarItem />
          <Container>
            <Switch>
              <Route path="/book" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/bill" component={Bill} />
              <Route path="/compare" component={Compare} />
              <Redirect from="/" to="/book" />
            </Switch>
          </Container>
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
