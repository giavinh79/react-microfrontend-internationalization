import React from 'react';
import ReactDOM from 'react-dom';

import { Microfrontend } from './Microfrontend';

export const App = () => <Microfrontend />;

ReactDOM.render(<App />, document.getElementById('react-microfrontend-app'));
