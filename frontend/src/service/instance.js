const axios = require('axios');

let token = null

if(localStorage.getItem('token'))
  token = JSON.parse(localStorage.getItem('token'))
  

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000/api'
});

instance.defaults.headers.common['Authorization'] = 'bearer ' + token;

export default instance