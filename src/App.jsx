import React from 'react';
import {
  Switch, Route, BrowserRouter, Redirect,
} from 'react-router-dom';
import { Login } from './routes/Login';
import { SuccessLogin } from './routes/SuccessLogin';
import { Chat } from './routes/Chat';
import './App.scss';


export const App = () => (
  <div className="general-wrapper">
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/success" component={SuccessLogin} />
          <Route path="/chat" component={Chat} />
          <Redirect to="/chat" />
        </Switch>
      </BrowserRouter>
    </div>
  </div>

);
