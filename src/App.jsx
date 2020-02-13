import React from 'react';
import {
  Switch, Route, BrowserRouter,
} from 'react-router-dom';
import { Login } from './routes/Login';
import { SuccessLogin } from './routes/SuccessLogin';
import { Chat } from './routes/Chat';


export const App = () => (
  <div className="App">
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/success" component={SuccessLogin} />
        <Route exact path="chat" component={Chat} />
        {/* <Redirect exact to="/" /> */}
      </Switch>
    </BrowserRouter>
  </div>
);
