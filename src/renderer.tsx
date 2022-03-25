import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/Application';
import { inDev } from './utils/helpers';

// Say something
console.log('[EmGui] : Renderer execution started');

// Render application in DOM
ReactDOM.render(<Application />, document.getElementById('app'));

// Hot module replacement
if (inDev() && module.hot) module.hot.accept();
