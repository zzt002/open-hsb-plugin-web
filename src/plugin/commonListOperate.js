import axios from "./ajax";
import {Message} from "view-design";

let commonOperateCreate = {
  key: '',
  url: '',
  title: '操作',
  text: 'click',
  width: '100px',
};
let arrParam = [];

let loading = false;

function dealParam(param) {
  let obj = {};
  for (let localKey in commonOperateCreate) {
    for (let key in param) {
      if (localKey === key) {
        commonOperateCreate[localKey] = param[key];
        obj[localKey] = param[key];
      }
    }
  }
  return obj;
}
function dealArr(inputP) {
  for (let i = 0; i < inputP.length; i++) {
    arrParam[i] = dealParam(inputP[i]);
  }
}


export function produce(inputP) {
  dealArr(inputP);
  return {
    title: commonOperateCreate.title, tooltip: true, align: 'center', width: commonOperateCreate.width , render: (h, params) => {
      return h('div',{},
        arrParam.map((param) => {
          return h('Button', {
            props: {
              type: 'primary',
              shape: 'circle',
              ghost: true,
              size: 'small',
              loading: loading,
            },
            on: {
              'click': () => {
                loading = true;
                let url = param.url;
                if (param.key !== '') {
                  url = url + params.row[param.key];
                }
                axios.post(url, null,
                  function (resp) {
                    document.getElementById('refresh').click();
                    Message.success({
                      content: resp.message,
                      duration: 3,
                    });
                    loading = false;
                  },
                  function (err) {
                    Message.error({
                      content: err.message,
                      duration: 3,
                    });
                    loading = false;
                  }
                );
              }
            }
          }, param.text)
        })
      )
    }
  }
}

export default {
  produce
}
