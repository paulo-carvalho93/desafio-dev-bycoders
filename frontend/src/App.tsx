import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';

import { ToastContainer } from 'react-toastify';
import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <ToastContainer />
    <Router>
      <Routes />
    </Router>
  </>
);

export default App;
