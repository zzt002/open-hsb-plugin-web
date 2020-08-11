import axios from 'axios'
import {Message} from 'view-design'
import router from '../router'

const axiosInstance = axios.create({
  timeout: 5000,
  baseURL: process.env.NODE_ENV === "production" ? (process.env.API_URL + ":" + process.env.URL_PORT) : "/api"
});

axiosInstance.interceptors.request.use(
  (conf) => {
    // console.log("request-conf");
    // console.log('conf:' + JSON.stringify(conf));
    let token = localStorage.getItem("token");
    conf.headers['token'] = token;
    return conf;
  },
  (err) => {
    // console.log("request-err");
    // console.log('request-err:' + JSON.stringify(err.data));
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (resp) => {
    // console.log("reponse");
    switch(resp.data.code){
      case 401:
        router.push('/login');
        break;
      case 55:
        // 55 为登录返回code
        localStorage.setItem("token", resp.data.data.token);
        localStorage.setItem("name", resp.data.data.name);
        localStorage.setItem("exp", resp.data.data.exp);
        router.push('/');
        router.go(0);
        break;
      case 555:
        resp.message = resp.data.message;
        return Promise.reject(resp);
    }

    return resp.data;
  },
  (err) => {
    // console.log("reponse-err");
    if (err.message.indexOf('timeout') > -1) {
      err.message = '请求超时';
    } else if (err.response === undefined) {
      // console.log("err:" + JSON.stringify(err))
    } else {
      let resp = err.response.data;
      switch (resp.status) {
        case 250:
          err.message = resp.message;
          break;
        case 500:
          err.message = "服务返回异常";
          break;
        case 504:
          err.message = "网络异常";
          break;
        default:
          err.message = "ERROR";
      }
    }
    return Promise.reject(err);
  },
);

export default {

  ajax(url, method, data, successMethod, errMethod) {
    if (method === 'get') {
      this.get(url, data, successMethod, errMethod);
    } else if (method === 'post') {
      this.post(url, data, successMethod, errMethod);
    } else if (method === 'delete') {
      this.delete(url, data, successMethod, errMethod);
    }
  },
  dealPostData(data) {
    let formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    // console.log('formData:' + formData);
    // console.log('formDataS:' + JSON.stringify(formData));
    return formData;
  },
  post(url, data, successMethod, errMethod) {
    let formData = this.dealPostData(data);
    return axiosInstance({
      url: url,
      method: 'post',
      data: formData,
    }).then(resp => {
      if (successMethod === undefined) {
        this.successMethod(resp);
      } else {
        successMethod(resp);
      }
    }).catch(err => {
      if (errMethod === undefined) {
        this.errMethod(err);
      } else {
        errMethod(err);
      }
    });
  },
  delete(url, data, successMethod, errMethod) {
    let formData = this.dealPostData(data);
    return axiosInstance({
      url: url,
      method: 'delete',
      data: formData,
    }).then(resp => {
      if (successMethod === undefined) {
        this.successMethod(resp);
      } else {
        successMethod(resp);
      }
    }).catch(err => {
      if (errMethod === undefined) {
        this.errMethod(err);
      } else {
        errMethod(err);
      }
    });
  },
  get(url, data, successMethod, errMethod) {
    return axiosInstance({
      url: url,
      method: 'get',
      params: data,
    }).then(resp => {
      if (successMethod === undefined) {
        this.successMethod(resp);
      } else {
        successMethod(resp);
      }
    }).catch(err => {
      if (errMethod === undefined) {
        this.errMethod(err);
      } else {
        errMethod(err);
      }
    });
  },
  download(url, fileName) {
    return axiosInstance({
      url: url,
      method: 'get',
      responseType: 'blob',
    }).then(resp => {
      this.downloadBlob(resp, fileName);
    }).catch(err => {
      this.errMethod(err);

    });
  },

  successMethod(resp) {
    Message.success({
      content: resp.message,
      duration: 3,
    });
  },
  errMethod(err) {
    Message.error({
      content: err.message,
      duration: 3,
    });
  },
  downloadBlob(resp, fileName){
    let blob = new Blob([resp]);
    if (navigator.msSaveOropenBlob) {
      // ie10
      navigator.msSaveBlob(blob, fileName);
    } else {
      // chrome/firefox
      let aTag = document.createElement('a');
      aTag.download = fileName;
      aTag.href = URL.createObjectURL(blob);
      aTag.click();
      URL.revokeObjectURL(aTag);
    }
  }
};

