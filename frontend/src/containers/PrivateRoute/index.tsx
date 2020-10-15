import React, {FC, useEffect} from 'react';
import Header from '../../components/Header';
import {Redirect, Route} from 'react-router-dom';
import authProvider from '../../helpers/auth.helper';
import { IAppState } from '../../models/appState';
import { loadUserRoutine } from '../../sagas/auth/routines';
import { connect, ConnectedProps } from 'react-redux';

export interface IPrivateRouteProps {
  component: any;
  exact: boolean;
  path: string;
}

const PrivateRoute: FC<IPrivateRouteProps & PrivateRouteStateProps> = ({ component: Component, user, loadUserData , ...rest }) => {
  const isLogged = authProvider.isLoggedIn();

  console.log({ isLogged })
  console.log({ user });

  useEffect(() => {
    if (isLogged && !user) {
      loadUserData();
    }
  }, [isLogged, user, loadUserData]);
  return (
    <Route
      {...rest}
      render={(props) => (
        !isLogged
          ? <Redirect to={{ pathname: '/login', state: { from: props.location }}}/>
          : <>
              <Header />
              <Component/>
            </>
      )}
    />
  );
};

const mapStateToProps = (appState: IAppState) => ({
  user: appState.auth.user
});

const mapDispatchToProps = {
  loadUserData: loadUserRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PrivateRouteStateProps = ConnectedProps<typeof connector>;
export default connector(PrivateRoute);