import React from 'react';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';
import {
  Header, Icon, Loader, Dimmer, Button,
} from 'semantic-ui-react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { SocketApi } from '../services/socketApi';
import { Channels } from './channels/Channels';
import { UserInfo } from '../components/userInfo';
import { Notification } from '../components/notification';

export const Chat = ({ history, match }) => {
  const token = localStorage.getItem('auth');
  const [loading, setLoading] = React.useState(true);

  const onClick = React.useCallback(() => {
    localStorage.removeItem('auth');
    history.push('/login');
  }, [history]);

  const fetchChannel = React.useCallback(async (channelId) => {
    const { data } = await Axios.get(`http://localhost:3002/channels/${channelId}`);
    return data.channel;
  }, []);

  React.useEffect(() => {
    if (SocketApi.io) {
      SocketApi.io.on('addedMessChannel', async ({ addedMess, channelId }) => {
        const channel = await fetchChannel(channelId);
        toast(<Notification channel={channel} msg={addedMess} />);
      });
      return () => SocketApi.io.off('addedMessChannel');
    }
  }, [fetchChannel]);

  React.useEffect(() => {
    setLoading(true);
    if (token && !SocketApi.io) {
      SocketApi.connect(token);
      setLoading(false);
      return () => SocketApi.io.disconnect();
    } if (!token) {
      history.push('/login');
    }
  }, [token, history]);


  return (
    <div className="w-100 h-100">

      <Header as="h1" block className="d-flex w-100">
        <Icon name="rocket" size="massive" />
        <Header.Content className="d-flex justify-content-between w-100">
          <div>Messenger</div>
          <Button onClick={onClick}>LogOut</Button>
        </Header.Content>
      </Header>
      <section className="chatWrapper">
        {
          loading ? (<Dimmer><Loader /></Dimmer>) : (
            <Switch>
              <Route path={`${match.path}/channels`} component={Channels} />
              <Route path={`${match.path}/info/:id`} component={UserInfo} />
              <Redirect to={`${match.path}/channels`} />
            </Switch>
          )
        }

      </section>
      <ToastContainer />
    </div>
  );
};
