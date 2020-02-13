import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { config } from '../config';

export const Login = () => (
  <div>
    <div>Welcome to Messenger</div>
    <div>{config.urlApi}</div>
    <div>{config.one}</div>
    <div>Please login</div>
    <a href="http://localhost:3002/auth/google">
      <Button color="google plus">
        <Icon name="google plus" />
        Login with Google
      </Button>
    </a>

  </div>
);
