import React, { FC } from 'react';
import { Route } from 'react-router-dom';

export interface IPublicRouteProps {
  component: any;
  exact: boolean;
  path: string;
}

const PublicRoute: FC<IPublicRouteProps> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (
        <>
          <Component />
        </>
      )}
    />
  );
};

export default PublicRoute;