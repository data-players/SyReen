import React from 'react';
import { RouteWithoutLayout } from 'react-admin';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserPage from "./pages/UserPage";
import RedirectPage from "./pages/RedirectPage";
import JoinGroupPage from "./pages/JoinGroupPage";

export default [
  <RouteWithoutLayout exact path="/" component={HomePage} />,
  <RouteWithoutLayout exact path="/u/:id" component={UserPage} />,
  <RouteWithoutLayout exact path="/r" component={RedirectPage} />,
  <Route exact path="/join" component={JoinGroupPage} />,
];
