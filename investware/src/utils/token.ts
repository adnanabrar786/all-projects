export function getToken() {
  return typeof localStorage !== 'undefined' && localStorage.getItem('token') ? localStorage.getItem('token') : false;
}
