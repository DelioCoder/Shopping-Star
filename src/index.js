import React from 'react';
import ReactDOM from 'react-dom';
import App from './frontend/App';
import 'bootstrap/dist/css/bootstrap.css';

import { Provider } from 'react-redux';
import store from './frontend/store';

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>, document.getElementById('root')
);
