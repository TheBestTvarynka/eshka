import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import LoginPage from '../../components/LoginPage';
import TeamPage from '../TeamPage';
import RegisterPage from '../../components/RegisterPage';
import SubjectPage from '../SubjectPage';
import QueuePage from '../../components/QueuePage';
import Dashboard from '../Dashboard';

const Routing: FC = () => {
  return (
    <>
      <Switch>
        <PublicRoute exact path="/login" component={LoginPage} />
        <PublicRoute exact path="/register" component={RegisterPage} />
        <PrivateRoute exact path="/" component={() => <span>Landing page</span>} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/team/:id" component={TeamPage} />
        <PrivateRoute exact path="/subject/:id" component={SubjectPage} />
        <PrivateRoute exact path="/queue/:id" component={QueuePage} />
        <Route path="/*" component={() => <span>Error</span>} />
      </Switch>
    </>
  );
}

export default Routing;