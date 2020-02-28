import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Icon } from 'semantic-ui-react';

export const Message = ({ text, user, time }) => (
  <Card className="w-100 m-2">
    <Card.Content>
      <Link to={`/chat/info/${user._id}`}>
        <Image
          floated="left"
          size="massive"
          src={user.picture}
          avatar
        />
      </Link>

      <Card.Header>
        {user.name}
        {'   '}
        {user.onlineStatus ? <Icon size="small" name="circle" /> : <Icon size="small" name="circle outline" />}
      </Card.Header>
      <Card.Meta>{time}</Card.Meta>
      <Card.Description>{text}</Card.Description>
    </Card.Content>
  </Card>
);
