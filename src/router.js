import login from './views/login'
import register from './views/register'
import home from './views/home'
import userRole from './modules/manager/userRole'

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
        name: 'userRole',
        component: userRole
      }
    ]
  }
]
