import login from './views/login'
import register from './views/register'
import home from './views/home'
import welcome from './modules/template/welcome'

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
        name: 'welcome',
        component: welcome
      }
    ]
  }
]
