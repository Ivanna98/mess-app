import React from 'react';
import Axios from 'axios';
import { Link, Route } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { SocketApi } from '../services/socketApi';

export const Channels = ({ match }) => {
  const [title, setTitle] = React.useState('');
  const [channels, setChannels] = React.useState([]);
  SocketApi.io.on('addedChannel', (channel) => {
    setChannels(channels.push(channel));
  });
  const onChange = React.useCallback((e) => {
    setTitle(e.target.value);
  }, []);
  const onClick = React.useCallback(() => {
    SocketApi.io.emit('newChannel', title);
    setTitle('');
  }, []);
  const onFetch = React.useCallback(async () => {
    try {
      const data = await Axios.get('http://localhost:3002/channels');
      setChannels(data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  React.useEffect(() => {
    onFetch();
  }, []);
  return (
    <div>
      <section>
        <input onChange={onChange} placeholder="Enter title new channel" />
        <Button onClick={onClick}>Create</Button>
      </section>
      <section>
        {channels.map((channel) => (
          <Link to={`${matchMedia.url}/${channel._id}`} key={channel._id}>
            <div>{channel.title}</div>
          </Link>
        ))}
        <Route path={`${match.path}/:channelId`} />
      </section>
    </div>

  );
};
