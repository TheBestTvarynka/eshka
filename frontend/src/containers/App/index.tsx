import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { store } from '../../store';
import { history } from '../../helpers/history.helper';
import Routing from '../Routing';

const App: React.FC = () => (
  <Provider store={store}>
    <Router history={history}>
      <Routing />
    </Router>
  </Provider>
);

export default App;
