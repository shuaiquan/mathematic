import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from './hot';

const App = () => (
    <div>Welcome TS React Template</div>
);

ReactDOM.render(<App />, document.getElementById('app'));

// Enable HMR
hot(module);