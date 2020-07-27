import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(Router);
Vue.use(ViewUI);

export default new Router({
  mode: 'hash',
  base: '/',
  routes
})

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
