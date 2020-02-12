import React from 'react';
import {
  Switch, Route, Redirect, BrowserRouter,
} from 'react-router-dom';
import { Login } from './component/login';


export const App = () => (
  <div className="App">
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </div>
);
