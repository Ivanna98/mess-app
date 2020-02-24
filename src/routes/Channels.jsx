import React from 'react';
import Axios from 'axios';
import { Link, Route } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { SocketApi } from '../services/socketApi';

export const Channels = ({ match }) => {
  const [title, setTitle] = React.useState('');
  const [channels, setChannels] = React.useState([]);
  const [newChannel, setNewChannel] = React.useState(0);

  const onChange = React.useCallback((e) => {
    setTitle(e.target.value);
  }, []);
  const onClick = React.useCallback(async () => {
    await Axios.post('http://localhost:3002/channels', { title });
    SocketApi.io.emit('newChannel');
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
    SocketApi.io.on('addedChannel', () => {
      onFetch();
      setNewChannel(newChannel + 1);
    });
  }, [newChannel]);
  return (
    <div>
      <section>
        <input onChange={onChange} value={title} placeholder="Enter title new channel" />
        <Button onClick={onClick}>Create</Button>
        <div>{title}</div>
      </section>
      <section>
        {
          (channels || []).map((channel) => (
            <Link to={`${matchMedia.url}/${channel._id}`} key={channel._id}>
              <div>{channel.title}</div>
            </Link>
          ))
        }
        <Route path={`${match.path}/:channelId`} />
      </section>
    </div>

  );
};
