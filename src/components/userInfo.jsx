import React from 'react';
import Axios from 'axios';
import {
  Card, Image, Icon, Button,
} from 'semantic-ui-react';

export const UserInfo = ({ match, history }) => {
  const [userData, setUserData] = React.useState({});
  const { id } = match.params;

  const onClick = React.useCallback(() => history.push('/chat/channels'), [history]);

  const onFetch = React.useCallback(async () => {
    const { data } = await Axios.get(`http://localhost:3002/user/${id}`);
    setUserData(data.user);
  }, [id]);

  React.useEffect(() => { onFetch(); }, [onFetch]);

  return (
    <div className="h-100 w-100 d-flex flex-column align-items-center justify-content-center">
      <Card>
        <Image
          floated="left"
          size="massive"
          src={userData.picture}
        />
        <Card.Header as="h1">{userData.name}</Card.Header>
        {userData.onlineStatus ? (
          <div as="h2">
            <Icon size="small" name="circle" />
            {' '}
            Online
          </div>
        ) : (
          <div as="h2">
            <Icon size="small" name="circle outline" />
            {' '}
            Offline
          </div>
        )}
      </Card>
      <Button onClick={onClick}>back</Button>
    </div>
  );
};
