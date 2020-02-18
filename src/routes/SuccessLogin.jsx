import qs from 'query-string';
import React from 'react';

export const SuccessLogin = ({ location, history }) => {
  const parsed = qs.parse(location.search);
  localStorage.setItem('auth', parsed.token);
  history.push('/chat');
  return (
    <div>{localStorage.getItem('auth')}</div>
  );
};
