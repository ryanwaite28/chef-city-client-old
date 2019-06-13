import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import './main.scss';

import App from './backbone/app';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

const app: App = new App();
Object.freeze(app);