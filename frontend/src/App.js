import React from 'react';
import { Admin, Resource } from 'react-admin';
import { createBrowserHistory } from 'history';
import { PodLoginPage, LogoutButton } from '@semapps/auth-provider';

import authProvider from './config/authProvider';
import dataProvider from './config/dataProvider';
import i18nProvider from './config/i18nProvider';

import Layout from './layout/Layout';
import theme from './config/theme';
import customRoutes from './customRoutes';

import ProjectCreate from './resources/Project/ProjectCreate';
import ProjectEdit from './resources/Project/ProjectEdit';
import ProjectShow from './resources/Project/ProjectShow';
import ProjectList from './resources/Project/ProjectList';

import OfferCreate from './resources/Offer/OfferCreate';
import OfferEdit from './resources/Offer/OfferEdit';
import OfferShow from './resources/Offer/OfferShow';
import OfferList from './resources/Offer/OfferList';

import ProfileCreate from './resources/Profile/ProfileCreate';
import ProfileEdit from './resources/Profile/ProfileEdit';
import ProfileShow from './resources/Profile/ProfileShow';
import ProfileList from './resources/Profile/ProfileList';

import LocationCreate from './resources/Location/LocationCreate';
import LocationEdit from './resources/Location/LocationEdit';
import LocationList from './resources/Location/LocationList';

const history = createBrowserHistory();

const customPodProviders = process.env.REACT_APP_POD_PROVIDER_DOMAIN_NAME
  && [{ 'apods:domainName': process.env.REACT_APP_POD_PROVIDER_DOMAIN_NAME, 'apods:area': 'Local' }];

const LoginPage = props => <PodLoginPage customPodProviders={customPodProviders} {...props} />

const App = () => (
  <Admin
    title={process.env.REACT_APP_NAME}
    history={history}
    authProvider={authProvider}
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    loginPage={LoginPage}
    logoutButton={LogoutButton}
    layout={Layout}
    theme={theme}
    customRoutes={customRoutes}
  >
    <Resource name="projects" create={ProjectCreate} edit={ProjectEdit} show={ProjectShow} list={ProjectList} />
    <Resource name="offers" create={OfferCreate} edit={OfferEdit} show={OfferShow} list={OfferList} />
    {/*
    <Resource name="requests" create={Create} edit={Edit} show={Show} list={List} />
    <Resource name="OfferAndRequest" list={List} />
    */}
    <Resource name="Actor" />
    <Resource name="Profile" create={ProfileCreate} show={ProfileShow} edit={ProfileEdit} list={ProfileList} />
    <Resource name="Location" create={LocationCreate} edit={LocationEdit} list={LocationList} />
    {/* Concepts : */}
    <Resource name="ProjectType" />
    <Resource name="Stage" />
    <Resource name="Unit" />
  </Admin>
);

export default App;
