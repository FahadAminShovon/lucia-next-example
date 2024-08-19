'use client';
import { logout } from '@/actions/logout';
import React from 'react';

const LogoutBtn = () => {
  const handleClick = () => {
    logout();
  };
  return <button onClick={handleClick}>logout</button>;
};

export default LogoutBtn;
