import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Icon } from 'semantic-ui-react';

const firstZero = (number) => {
  if (number < 10) return (`0${number}`);
  return number;
};

const timeToRightForm = (time) => {
  const date = new Date(time);
  const day = firstZero(date.getDay());
  const month = firstZero(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = firstZero(date.getHours());
  const minutes = firstZero(date.getMinutes());
  const seconds = firstZero(date.getSeconds());
  return (`${day}.${month}.${year}  ${hours}:${minutes}:${seconds}`);
};

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
      <Card.Meta>{timeToRightForm(time)}</Card.Meta>
      <Card.Description>{text}</Card.Description>
    </Card.Content>
  </Card>
);
