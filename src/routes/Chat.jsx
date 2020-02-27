import React from 'react';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';
import { SocketApi } from '../services/socketApi';
import { Channels } from './channels/Channels';
import { UserInfo } from '../components/userInfo';

export const Chat = ({ history, match }) => {
  const token = localStorage.getItem('auth');

  React.useEffect(() => {
    if (token && !SocketApi.io) {
      SocketApi.connect(token);
    } else {
      history.push('/login');
    }
  }, [history, token]);

  return (
    <div className="w-100 h-100">
      <Header as="h1" block>
        <Icon name="rocket" size="massive" />
        <Header.Content>Messenger</Header.Content>
      </Header>
      <section className="chatWrapper">
        <Switch>
          <Route path={`${match.path}/channels`} component={Channels} />
          <Route exact path="/info" component={UserInfo} />
          <Redirect to={`${match.path}/channels`} />
        </Switch>
      </section>

    </div>

  );
};
