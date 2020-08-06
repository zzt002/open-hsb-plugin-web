import axios from "./ajax";
import {Message} from "view-design";

const commonOperateCreate = {
  key: '',
  url: '',
  title: '操作',
  text: 'click',
  width: '100px',
};

let loading = false;

function dealParam(inputP) {
  for (let localKey in commonOperateCreate) {
    for (let key in inputP) {
      if (localKey === key) {
        commonOperateCreate[localKey] = inputP[key];
      }
    }
  }
}


export function produce(inputP) {
  dealParam(inputP);
  return {
    title: commonOperateCreate.title, tooltip: true, align: 'center', width: commonOperateCreate.width ,render: (h, params) => {
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
            let url = commonOperateCreate.url;
            if (commonOperateCreate.key !== '') {
              url = url + params.row[commonOperateCreate.key];
            }
            axios.post(url, null,
              function (resp) {
                document.getElementById('refresh').click();
                if (resp.data.indexOf("失败") > -1) {
                  Message.error({
                    content: resp.data,
                    duration: 5,
                  });
                } else {
                  Message.success({
                    content: resp.data,
                    duration: 5,
                  });
                }
                loading = false;
              },
              function (err) {
                Message.error({
                  content: err.message,
                  duration: 5,
                });
                loading = false;
              }
            );
          }
        }
      }, commonOperateCreate.text)
    }
  };
}


export default {
  produce
}
