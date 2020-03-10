import React from 'react';
import {
  Button, Item, TextArea, Form,
} from 'semantic-ui-react';
import axios from '../services/api';
import { Message } from './message';
import { SocketApi } from '../services/socketApi';

export const Channel = ({ match }) => {
  const [messValue, setMessValue] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [newMess, setNewMess] = React.useState({});
  const [userStatus, setUserStatus] = React.useState();
  const [typingData, setTypingData] = React.useState('');
  const [stateTimeoutId, setStateTimeoutId] = React.useState('');

  const { channelId } = match.params;
  const onClick = React.useCallback(() => {
    SocketApi.io.emit('message', { messValue, channelId });
    setMessValue('');
  }, [messValue, channelId]);

  const onChange = React.useCallback((e) => {
    setMessValue(e.target.value);
    SocketApi.io.emit('typing');
  }, []);

  const onKeyPress = React.useCallback((e) => {
    if (e.which !== 13) {
      SocketApi.io.emit('typing', channelId);
    } else {
      SocketApi.io.emit('message', { messValue, channelId });
      setMessValue('');
    }
  }, [messValue, channelId]);

  const onFetch = React.useCallback(async () => {
    const { data } = await axios.get(`http://localhost:3002/message?channel=${channelId}`);
    setMessages(data.messages);
  }, [channelId]);

  React.useEffect(() => {
    onFetch();
    SocketApi.io.on('updateOnlineStatus', ({ user, onlineStatus }) => {
      setUserStatus({ user, onlineStatus });
    });
    return () => SocketApi.io.off('updateOnlineStatus');
  }, [channelId, userStatus, onFetch]);

  React.useEffect(() => {
    SocketApi.io.on(`addedMess${channelId}`, ({ addedMess }) => {
      setMessages([...messages, addedMess]);
      setNewMess(addedMess);
    });
    return () => SocketApi.io.off(`addedMess${channelId}`);
  }, [newMess, messages, channelId]);

  React.useEffect(() => {
    SocketApi.io.on(`userTyping${channelId}`, (name) => {
      setTypingData(`${name} is typing...`);
      const timeoutId = setTimeout(() => setTypingData(null), 2000);
      if (stateTimeoutId) {
        clearTimeout(timeoutId);
      }
      setStateTimeoutId(timeoutId);
    });
    return () => SocketApi.io.off(`userTyping${channelId}`);
  }, [typingData, channelId]);

  return (

    <div className="h-100">
      <Item.Group className="wrapperMess pr-4">
        {(messages || []).map((message) => (
          <div key={message._id}>
            <Message
              user={message.author}
              text={message.text}
              time={message.createdAt}
            />
          </div>
        ))}
      </Item.Group>
      <div className="d-flex flex-column justify-content-between">
        <div className="userTyping">{typingData}</div>
        <Form className="w-100 d-flex justify-content-around sendMess">
          <TextArea onChange={onChange} onKeyPress={onKeyPress} value={messValue} placeholder="Enter your message" />
          <Button onClick={onClick}>Send</Button>
        </Form>
      </div>
    </div>
  );
};
