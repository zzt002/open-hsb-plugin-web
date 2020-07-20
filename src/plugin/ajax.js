import axios from 'axios'

const axiosInstance = axios.create({
  timeout: 20000,
});

axiosInstance.interceptors.request.use(
  (conf) => {
    // console.log('conf:' + JSON.stringify(conf));
    return conf;
  },
  (err) => {
    // console.log('request-err:' + JSON.stringify(err.data));
    return Promise.reject(err);
  }

);

axiosInstance.interceptors.response.use(
  (resp) => {
    console.log('response:' + JSON.stringify(resp.data));
    return resp.data;
  },
  (err) => {
    let resp = err.response.data;
    switch (resp.status) {
      case 250:
        err.message = resp.message;
        break;
      case 500:
        err.message = resp.message;
        break;
      default:
        err.message = `连接服务错误${resp.status}`;
    }

    return Promise.reject(err);
  }
);

export default {

    post(url, data, successMethod, errMethod) {
      return axiosInstance({
        url: url,
        method: 'post',
        params: data,
      }).then(resp => {
        successMethod(resp);
      }).catch(err => {
        errMethod(err);
      });
    },

    successMethod(resp) {
      alert(resp.data);
    },
    errMethod(err) {
      alert(err.message);
    }

};

