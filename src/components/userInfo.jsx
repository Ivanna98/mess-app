import React from 'react';

export const userInfo = ({ picture, name }) => (
  <div>
    <div className="profilePicture" style={{ backgroundImage: `url(${picture})` }} />
    <div className="name">{name}</div>
  </div>
);
