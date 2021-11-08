import store from '../store/index'

const axios = require("axios");

const instance = axios.create({
  baseURL: "http://127.0.0.1:3000/api",
});

class ApiClient {
  headers() {
    return {
      headers: {
        Authorization: `bearer ${JSON.parse(
          localStorage.getItem("token")
        )}`
      }
    }
  }
  
  get(path) {
    return new Promise((resolve) => {
      instance
        .get(path, this.headers())
        .then((response) => resolve(response))
        .catch((e) => {
          if (e.response.status === 401) {
            store.dispatch("logout", true);
          }
          console.log(e)
        })
    });
  }

  post(path, body) {
    return new Promise((resolve) => {
      instance
        .post(path, body, this.headers())
        .then((response) => resolve(response))
        .catch((e) => {
          if (e.response.status === 401) {
            store.dispatch("logout", true);
          }
          console.log(e)
        })
    });
  }

  put(path, body) {
    return new Promise((resolve) => {
        instance.put(path, body, this.headers())
        .then((response) => resolve(response))
        .catch((e) => {
          if (e.response.status === 401) {
            store.dispatch("logout", true);
          }
          console.log(e)
        })
      })
  }

  delete(path) {
    return new Promise((resolve) => {
        instance.delete(path, this.headers())
        .then((response) => resolve(response))
        .catch((e) => {
          if (e.response.status === 401) {
            store.dispatch("logout", true);
          }
          console.log(e)
        })
      })
  }
}

export const apiClient = new ApiClient();
