import React from 'react';
import Axios from 'axios';
import {
  Button, Item, TextArea, Form,
} from 'semantic-ui-react';
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
  }, [messValue, channelId]);

  const onChange = React.useCallback((e) => {
    setMessValue(e.target.value);
  }, []);

  const onFetch = React.useCallback(async () => {
    const { data } = await Axios.get(`http://localhost:3002/message?channel=${channelId}`);
    setMessages(data.messages);
  }, [channelId]);

  React.useEffect(() => {
    onFetch();
    SocketApi.io.on('addedMess', ({ addedMess }) => {
      setMessages([...messages, addedMess]);
      setNewMess(addedMess);
    });
    return () => SocketApi.io.off('addedMess');
  }, [newMess, onFetch]);

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

      <Form className="w-100 d-flex justify-content-around sendMess">
        <TextArea onChange={onChange} value={messValue} placeholder="Enter your message" />
        <Button onClick={onClick}>Send</Button>
      </Form>

    </div>
  );
};
