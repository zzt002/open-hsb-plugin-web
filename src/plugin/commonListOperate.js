import axios from "./ajax";
import {Message} from "view-design";

let commonOperateCreate = {
  key: '',
  url: '',
  title: '操作',
  text: 'click',
  width: '100px',
};

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
  let arrParam = [];
  for (let i = 0; i < inputP.length; i++) {
    arrParam[i] = dealParam(inputP[i]);
  }
  return arrParam;
}

function render_button(h, param, params) {
  let loading = false;
  return h('Button', {
    props: {
      type: 'primary',
      shape: 'circle',
      ghost: true,
      size: 'small',
      loading: loading, // 无法动态绑定，未找到原因，初步认为是js而非vue渲染造成
    },
    on: {
      'click': (event) => {
        loading = true;
        let is = event.currentTarget;
        is.disabled = true;
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
            is.disabled = false;
          },
          function (err) {
            Message.error({
              content: err.message,
              duration: 3,
            });
            loading = false;
            is.disabled = false;
          }
        );
      }
    }
  }, param.text)
}

export function produce(inputP) {
  let arrParam = dealArr(inputP);
  return {
    title: commonOperateCreate.title, tooltip: true, align: 'center', width: commonOperateCreate.width , render: (h, params) => {
      return h('div',{},
        arrParam.map((param) => {
           return h('span',{}, [
             render_button(h, param, params),
             h('span',' ')
           ])
        })
      )
    }
  }
}

export default {
  produce
}
