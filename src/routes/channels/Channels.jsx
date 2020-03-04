import React from 'react';
import Axios from 'axios';
import {
  Link, Route,
} from 'react-router-dom';
import {
  Button, Card, Menu, Input,
} from 'semantic-ui-react';
import { SocketApi } from '../../services/socketApi';
import { Channel } from '../../components/channel';
import './channels.scss';

export const Channels = ({ match }) => {
  const [title, setTitle] = React.useState('');
  const [channels, setChannels] = React.useState([]);
  const [newChannel, setNewChannel] = React.useState({});

  const onChange = React.useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const onClick = React.useCallback(() => {
    SocketApi.io.emit('newChannel', { title });
    setTitle('');
  }, [title]);

  const onFetch = React.useCallback(async () => {
    try {
      const { data } = await Axios.get('http://localhost:3002/channels');
      setChannels(data.channels);
    } catch (error) {
      console.log(error);
    }
  }, []);


  React.useEffect(() => {
    onFetch();
  }, []);

  React.useEffect(() => {
    SocketApi.io.on('addedChannel', (addedChannel) => {
      setChannels([...channels, addedChannel]);
      setNewChannel(addedChannel);
    });
    return () => {
      SocketApi.io.off('addedChannel');
    };
  }, [newChannel, channels]);

  return (
    <div className="d-flex justify-content-around h-100 w-100 ">
      <section className="channelsWrapper p-4">
        <div className="d-flex justify-content-around newChannel">
          <Input onChange={onChange} value={title} placeholder="Enter title new channel" />
          <Button onClick={onClick}>Create</Button>
        </div>

        <section className="w-100 channels">
          {
            (channels || []).map((channel) => (
              <Menu.Item as={Link} to={`${match.url}/${channel._id}`} key={channel._id}>
                <Card className="channelTitleItem m-3 p-2">{channel.title}</Card>
              </Menu.Item>
            ))
          }
        </section>
      </section>
      <section className="wrapperChannel ">
        <Route path={`${match.path}/:channelId`} component={Channel} />
      </section>

    </div>

  );
};
