import React from 'react';
import { Button, Icon, Message } from 'semantic-ui-react';
import axios from 'axios';
import { config } from '../config';

export const Login = () => {
  const onClick = React.useCallback(() => {
    axios.get('http://localhost:3002/auth/google');
    // axios.get(`${config.urlApi}/auth/google/callback`)
    //   .then(({ data }) => {
    //     localStorage.setItem('auth', data.token);
    //   });

    // return (
    //   <Message>
    //     <Message.Header>Done</Message.Header>

    //   </Message>
    // );
  }, []);


  return (
    <div>
      <div>Welcome to Messenger</div>
      <div>{config.urlApi}</div>
      <div>{config.one}</div>
      <div>Please login</div>
      <Button onClick={onClick} color="google plus">
        <Icon name="google plus" />
        Login with Google
      </Button>
    </div>
  );
};
