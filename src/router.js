import login from './views/login'
import register from './views/register'
import home from './views/home'
import showMachine from './modules/devops/showMachine'
import addMachine from './modules/devops/addMachine'
export default [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    children: [
      {
        path: '',
        name: 'showMachine',
        component: showMachine
      }
    ]
  },
  {
    path: '/maintain',
    name: 'maintain',
    children: [
      {
        path: '/addMachine',
        name: 'addMachine',
        component: addMachine
      }
    ]
  }

]
