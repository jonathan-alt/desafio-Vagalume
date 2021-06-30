import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer autoClose={5000} pauseOnHover />
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
