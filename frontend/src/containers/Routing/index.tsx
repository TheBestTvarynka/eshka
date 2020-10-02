import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import MainPage from '../MainPage';

const Routing: FC = () => {

  return (
    <div>
      <Switch>
        <PrivateRoute exact path="/" component={() => <span>Landing page</span>} />
        <PrivateRoute exact path="/home" component={MainPage} />
        <Route path="/*" component={() => <span>Error</span>} />
      </Switch>
    </div>
  );
}

export default Routing;