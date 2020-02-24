import React from 'react';
import {
  Switch, Route, BrowserRouter, Redirect,
} from 'react-router-dom';
import { SocketApi } from '../services/socketApi';
import { Channels } from './Channels';
import { UserInfo } from '../components/userInfo';

export const Chat = ({ history }) => {
  const token = localStorage.getItem('auth');

  React.useEffect(() => {
    if (token) {
      SocketApi.connect(token);
    } else {
      history.push('/login');
    }
  }, [token, history]);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/channels" component={Channels} />
          <Route exact path="/info" component={UserInfo} />
          <Redirect exact to="/channels" />
        </Switch>
      </BrowserRouter>
    </div>

  );
};
