import React from 'react';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';
import {
  Header, Icon, Loader, Dimmer,
} from 'semantic-ui-react';
import { SocketApi } from '../services/socketApi';
import { Channels } from './channels/Channels';
import { UserInfo } from '../components/userInfo';

export const Chat = ({ history, match }) => {
  const token = localStorage.getItem('auth');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    if (token && !SocketApi.io) {
      SocketApi.connect(token);
      setLoading(false);
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
        {
          loading ? (<Dimmer><Loader /></Dimmer>) : (
            <Switch>
              <Route path={`${match.path}/channels`} component={Channels} />
              <Route exact path="/info" component={UserInfo} />
              <Redirect to={`${match.path}/channels`} />
            </Switch>
          )
        }

      </section>

    </div>

  );
};
