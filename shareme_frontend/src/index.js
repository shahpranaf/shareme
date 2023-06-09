import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import App from './App';
import './index.css';


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Router basename='/shareme'><App /></Router>);
