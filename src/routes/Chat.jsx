import React from 'react';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';
import {
  Header, Icon, Loader, Dimmer,
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
  const [channelMess, setChannelMess] = React.useState({});
  const [id, setId] = React.useState('');

  const fetchChannel = React.useCallback(async () => {
    const { data } = await Axios.get(`http://localhost:3002/channels/${id}`);
    setChannelMess(data.channel);
  }, [id]);

  React.useEffect(() => {
    setLoading(true);
    if (token && !SocketApi.io) {
      SocketApi.connect(token);
      setLoading(false);
    } else if (!token) {
      history.push('/login');
    }
  }, [token]);

  React.useEffect(() => {
    SocketApi.io.on('addedMessChannel', ({ addedMess, channelId }) => {
      setId(channelId);
      fetchChannel();
      toast(<Notification channel={channelMess} msg={addedMess} />);
    });
    return () => SocketApi.io.off('addedMessChannel');
  }, [channelMess, fetchChannel]);

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
