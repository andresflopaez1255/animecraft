export const environment = {
  production: false,
  apiURL: (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' ? window.location.origin : 'http://localhost:3000') + '/api',
};
