import Vue from 'vue'
import Router from 'vue-router'
import Session from './components/Session';
import MainView from './components/MainView';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/session',
      name: 'session',
      component: Session
    }
  ]
})