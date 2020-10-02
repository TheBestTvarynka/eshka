import React, { FC } from 'react';
import Header from '../../components/Header';
import { Route } from 'react-router-dom';

export interface IPrivateRouteProps {
  component: any,
  exact: boolean,
  path: string
}

const PrivateRoute: FC<IPrivateRouteProps> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (
        <>
          <Header />
          <Component />
        </>
      )}
    />
  );
};

export default PrivateRoute;