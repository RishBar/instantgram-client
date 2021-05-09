import React from 'react';
import {Route} from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

export default [
  <Route key="Register" path="/register" exact component={RegistrationForm} />,
  <Route key="Login" path="/login" exact component={LoginForm} />
];