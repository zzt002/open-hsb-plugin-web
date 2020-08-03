import axios from 'axios'
import {Message} from 'view-design'

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
    // console.log('response:' + JSON.stringify(resp.data));
    return resp.data;
  },
  (err) => {
    if (err.message.indexOf('timeout') > -1) {
      err.message = '请求超时';
    } else {
      let resp = err.response.data;
      switch (resp.status) {
        case 250:
          err.message = resp.message;
          break;
        case 500:
          err.message = resp.message;
          break;
        default:
          err.message = `服务器异常`;
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
      duration: 5,
    });
  },
  errMethod(err) {
    Message.error({
      content: err.message,
      duration: 5,
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

