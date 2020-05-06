import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Tracker from "./pages/Tracker";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/tracker' component={Tracker} />
            </Switch>
        </BrowserRouter>
    );
}
