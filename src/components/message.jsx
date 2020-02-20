import React from 'react';

export const Message = ({ text, user, time }) => (
  <div className="wrapper-mess">
    <div className="picture-users" style={{ backgroundImage: `url(${user.picture})` }} />
    <div className="text-mess">{text}</div>
    <div className="time-mess">{time}</div>
  </div>
);
