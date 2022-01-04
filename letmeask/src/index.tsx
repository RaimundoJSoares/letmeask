import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './services/firebase'
import './styles/global.scss'

ReactDOM.render( //rendezinar, exibir algo dentro do html
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

