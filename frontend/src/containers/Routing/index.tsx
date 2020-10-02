import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';

const Routing: FC = () => {

  return (
    <div>
      <Switch>
        <PrivateRoute exact path="/" component={() => <span>Landing page</span>} />
        <PrivateRoute exact path="/home" component={() => <span>Home page</span>} />
        <Route path="/*" component={() => <span>Error</span>} />
      </Switch>
    </div>
  );
}

export default Routing;