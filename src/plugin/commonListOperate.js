import axios from "./ajax";


let commonOperateCreate = {
  title:'操作',
  url:'',
  text:'click',
};


export function produce(inputP) {
  inputP = inputP === undefined ? commonOperateCreate : inputP;
  return {title: inputP.title, tooltip: true, align: 'center', render: (h, params) => {
      return h('Button', {
        on: {
          'click': () => {
            alert("click ok");
            // axios.post(this.url,null,function(resp){
            //
            // });
          }
        }
      }, inputP.text)
    }
  };
}


export default {
  produce
}
