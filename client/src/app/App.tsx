import React from "react";
import "./App.css";
import {NavbarItem} from "../components/navbar";
import {ListBook} from "../components/listBook";
import {Container} from "react-bootstrap";
import {createBrowserHistory} from "history";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {ListCategory} from "../components/listCaterogy";
import {ListBill} from "../components/listBill";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const history = createBrowserHistory();

function App() {
    return (
        <div>
            <Router history={history}>
                <div>
                    <NavbarItem/>
                    <Container>
                        <Switch>
                            <Route path="/book" component={ListBook}/>
                            <Route path="/category" component={ListCategory}/>
                            <Route path="/bill" component={ListBill}/>
                            <Redirect from="/" to="/book"/>
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
