import Vue from 'vue'
import Router from 'vue-router'
import Session from './components/Session';
import MainView from './components/MainView';
import SessionReport from './components/SessionReport';
import login from './views/login';
import signup from './views/signup';


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
      path: '/main',
      name: 'main',
      component: MainView
    },
    {
      path: '/session',
      name: 'session',
      component: Session
    },
    {
      path: '/sessionReport',
      name: 'sessionReport',
      component: SessionReport
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
    ,
    {
      path: '/signup',
      name: 'signup',
      component: signup
    }
  ]
})