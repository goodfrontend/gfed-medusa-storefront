'use client';

import { useState } from 'react';

import { Login } from '../login';
import { Register } from '../register';

export enum LOGIN_VIEW {
  SIGN_IN = 'sign-in',
  REGISTER = 'register',
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState('sign-in');

  return (
    <div className="flex w-full justify-start px-8 py-8">
      {currentView === 'sign-in' ? (
        <Login setCurrentView={setCurrentView} />
      ) : (
        <Register setCurrentView={setCurrentView} />
      )}
    </div>
  );
};

export { LoginTemplate };
