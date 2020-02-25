import React from 'react';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';
import { SocketApi } from '../services/socketApi';
import { Channels } from './Channels';
import { UserInfo } from '../components/userInfo';

export const Chat = ({ history, match }) => {
  const token = localStorage.getItem('auth');

  React.useEffect(() => {
    if (token && !SocketApi.io) {
      SocketApi.connect(token);
    } else if (!token) {
      history.push('/login');
    }
  }, []);

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/channels`} component={Channels} />
        <Route exact path="/info" component={UserInfo} />
        <Redirect to={`${match.path}/channels`} />
      </Switch>
    </div>

  );
};
