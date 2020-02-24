import React from 'react';
import Axios from 'axios';
import { Link, Route } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { SocketApi } from '../services/socketApi';
import { Channel } from '../components/channel';

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
  }, [newChannel]);


  React.useEffect(() => {
    onFetch();
    SocketApi.io.on('addedChannel', (addedChannel) => {
      setChannels([...channels, addedChannel]);
      setNewChannel(addedChannel);
    });
  }, [newChannel]);
  return (
    <div className="d-flex flex-column justify-content-center h-100 ">
      <section className="w-100">
        <input onChange={onChange} value={title} placeholder="Enter title new channel" />
        <Button onClick={onClick}>Create</Button>
        <div>{title}</div>
      </section>
      <section className="w-100">
        {
          (channels || []).map((channel) => (
            <Link to={`${matchMedia.url}/${channel._id}`} key={channel._id}>
              <div>{channel.title}</div>
            </Link>
          ))
        }
        <Route path={`${match.path}/:channelId`} component={Channel} />
      </section>
    </div>

  );
};
