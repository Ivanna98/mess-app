import qs from 'query-string';
import React from 'react';

export const SuccessLogin = ({ location }) => {
  const parsed = qs.parse(location.search);
  localStorage.setItem('auth', parsed.token);
  return (
    <div>{localStorage.getItem('auth')}</div>
  );
};
