import React from 'react';
import Axios from 'axios';

export const UserInfo = ({ match }) => {
  const [userData, setUserData] = React.useState({});
  const { id } = match.params;
  const onFetch = React.useCallback(async () => {
    const data = await Axios.get(`http://localhost:3002/user/${id}`);
    setUserData(data);
  }, [id]);
  React.useEffect(() => onFetch(), []);
  return (
    <div>
      <div className="profilePicture" style={{ backgroundImage: `url(${userData.picture})` }} />
      <div className="status">{userData.onlineStatus ? 'online' : 'offline'}</div>
      <div className="name">{userData.name}</div>
    </div>
  );
};
