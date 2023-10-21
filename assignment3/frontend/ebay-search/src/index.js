import React,{useState} from 'react';
import ReactDOM from 'react-dom/client';


import 'bootstrap/dist/css/bootstrap.css';
import 'react-tooltip/dist/react-tooltip.css'

import './index.css';

import WebSite from './website';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WebSite />
  </React.StrictMode>
);

