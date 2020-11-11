import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store';
import ReduxToastr from 'react-redux-toastr';
import Routing from '../Routing';

const App: React.FC = () => (
  <Provider store={store}>
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="bottom-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      closeOnToastrClick
      progressBar
    />
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </Provider>
);

export default App;
