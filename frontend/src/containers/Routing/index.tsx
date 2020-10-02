import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

const Routing: FC = () => {

  return (
    <div>
      <Switch>
        <Route exact path="/" component={() => <span>Landing page</span>} />
        <Route exact path="/home" component={() => <span>Home page</span>} />
        <Route path="/*" component={() => <span>Error</span>} />
      </Switch>
    </div>
  );
}

export default Routing;