import React from 'react';
import Axios from 'axios';
import { Button } from 'semantic-ui-react';
import { Message } from './message';
import { SocketApi } from '../services/socketApi';

export const Channel = ({ match }) => {
  const [messValue, setMessValue] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [newMess, setNewMess] = React.useState({});
  const { channelId } = match.params;
  const onClick = React.useCallback(() => {
    SocketApi.io.emit('message', { messValue, channelId });
    setMessValue('');
  }, [messValue]);
  const onChange = React.useCallback((e) => {
    setMessValue(e.target.value);
  }, []);
  const onFetch = React.useCallback(async () => {
    const { data } = await Axios.get(`http://localhost:3002/message?channel=${channelId}`);
    setMessages(data);
  }, []);
  React.useEffect(() => {
    onFetch();
    SocketApi.io.on('addedMess', (addedMess) => {
      setMessages([...messages, addedMess]);
      setNewMess(addedMess);
    });
  }, [newMess]);
  return (
    <div>
      <div className="wrapper-channel">
        {messages.map((message) => (
          <Message user={message.author} text={message.text} time={message.createdAt} />
        ))}
      </div>
      <div>
        <input onChange={onChange} value={messValue} placeholder="Enter your message" />
        <Button onClick={onClick}>Send</Button>
      </div>
    </div>

  );
};
