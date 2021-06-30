/* eslint-disable no-extra-boolean-cast */
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import List from '../pages/ClientList';
import AboutClient from '../pages/ClientInfo';

const routes = [
  {
    component: Login,
    path: '/',
  },
  {
    component: List,
    name: 'ClientList',
    path: '/client-list',
    isPrivate: true,
  },
  {
    component: AboutClient,
    name: 'AboutClient',
    path: '/client-data/:id',
    isPrivate: true,
  },
];

const PrivateRoute = ({ component: Component, isPrivate, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !!sessionStorage.getItem('userToken') ? (
        <Component {...props} />
      ) : (
        <Redirect to='/' />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      {routes.map(({ path, isPrivate, component }) =>
        isPrivate ? (
          <PrivateRoute exact key={path} path={path} component={component} />
        ) : (
          <Route exact key={path} path={path} component={component} />
        )
      )}
    </Switch>
  </BrowserRouter>
);
export default Routes;
