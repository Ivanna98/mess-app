import React from 'react';
import { Button } from 'semantic-ui-react';
import {
  Switch, Route, BrowserRouter, Redirect,
} from 'react-router-dom';
import { SocketApi } from '../services/socketApi';
import { Channels } from './Channels';

export const Chat = ({ history }) => {
  const [value, setValue] = React.useState('');
  const [done, setDone] = React.useState('');
  const token = localStorage.getItem('auth');

  const onClick = React.useCallback(() => {
    SocketApi.io.emit('message', value);
    setValue('');
  }, []);

  const onChange = React.useCallback((e) => {
    SocketApi.io.emit('typing');
    setValue(e.target.value);
  }, []);

  React.useEffect(() => {
    if (token) {
      SocketApi.connect(token);
      setDone('success');
    } else {
      history.push('/login');
    }
  }, [token, history]);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/channels" component={Channels} />
          <Redirect exact to="/channels" />
        </Switch>
      </BrowserRouter>

      <input placeholder="Enter your message" value={value} onChange={onChange} />
      <Button onClick={onClick}>Send</Button>

      <div>{done}</div>
      <div>{token}</div>
    </div>

  );
};
