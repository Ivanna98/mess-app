import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import './login.scss';

export const Login = () => (
  <div className="login">
    <section className="d-flex flex-column">
      <div className="title">
        <p className="text-secondary">Welcome to</p>
        <p className="text-dark name">Messenger</p>
      </div>
      <div className="wrapper">
        <div className="text-center text-secondary">Please login</div>
        <a href="http://localhost:3002/auth/google">
          <Button color="google plus">
            <Icon name="google plus" />
            Login with Google
          </Button>
        </a>
      </div>

    </section>

    <div className="picture" />
  </div>
);
