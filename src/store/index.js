import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store( {

  state: {
    layoutInfo: {
      openName: '',
      active: '',
      first: '',
      second: '',
    }
  },

  mutations: {
    setLayoutInfo (state, layoutInfo){
      state.layoutInfo = layoutInfo;
      sessionStorage.setItem('layoutInfo', JSON.stringify(state.layoutInfo));
    }
  }

})
