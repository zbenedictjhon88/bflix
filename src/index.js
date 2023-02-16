import React from 'react';
import ReactDOM from 'react-dom/client';
import AdSense from 'react-adsense';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import './assets/css/style.css';
import './assets/css/media.css';
import './assets/css/animation.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <div>
      <AdSense.Google
        client='ca-pub-5354629759396987'
        slot='7806394673'
        style={{ display: 'none' }}
        format='auto'
        responsive='true'
        layoutKey='-gw-1+2a-9x+5c'
      />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
