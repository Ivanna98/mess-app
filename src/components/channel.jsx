import React from 'react';
import Axios from 'axios';
import { Message } from './message';

export const channel = ({ match }) => {
  const [messages, setMessages] = React.useState([]);
  const { channelId } = match.params;
  const onFetch = React.useCallback(async () => {
    const data = await Axios.get(`http://localhost:3002/message?channel=${channelId}`);
    setMessages(data);
  }, []);
  React.useEffect(() => onFetch());
  return (
    <div className="wrapper-channel">
      {messages.map((message) => (
        <Message user={message.author} text={message.text} time={message.createdAt} />
      ))}
    </div>
  );
};
