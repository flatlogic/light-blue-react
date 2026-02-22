/* global __APP_ENV__ */

const appEnv = typeof __APP_ENV__ !== 'undefined' ? __APP_ENV__ : {};
const nodeEnv =
  appEnv.NODE_ENV || (typeof process !== 'undefined' && process.env ? process.env.NODE_ENV : 'development');
const backendEnvValue =
  appEnv.VITE_BACKEND || (typeof process !== 'undefined' && process.env ? process.env.REACT_APP_BACKEND : undefined);
const isBackend = backendEnvValue === true || backendEnvValue === 'true' || backendEnvValue === '1';
const isDevelopment = nodeEnv === 'development';

const hostApi = isDevelopment ? 'http://localhost' : 'https://sing-generator-node.herokuapp.com';
const portApi = isDevelopment ? 8080 : '';
const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;
const redirectUrl = isDevelopment ? 'http://localhost:3000' : 'https://demo.flatlogic.com/light-blue-react';

export default {
  redirectUrl,
  hostApi,
  portApi,
  baseURLApi,
  remote: 'https://sing-generator-node.herokuapp.com',
  isBackend,
  auth: {
    email: 'admin@flatlogic.com',
    password: 'password',
  },
  app: {
    colors: {
      dark: '#333964',
      light: '#0A0417',
      sea: '#4A4657',
      sky: '#3A3847',
      rain: '#3846AA',
      middle: '#3390C3',
    },
  },
};
