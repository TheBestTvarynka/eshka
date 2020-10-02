import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import MainPage from '../MainPage';
import LoginPage from '../../components/LoginPage';
import RegisterPage from '../../components/RegisterPage';

const Routing: FC = () => {

  return (
    <div>
      <Switch>
        <PublicRoute exact path="/login" component={LoginPage} />
        <PublicRoute exact path="/register" component={RegisterPage} />
        <PrivateRoute exact path="/" component={() => <span>Landing page</span>} />
        <PrivateRoute exact path="/home" component={MainPage} />
        <Route path="/*" component={() => <span>Error</span>} />
      </Switch>
    </div>
  );
}

export default Routing;