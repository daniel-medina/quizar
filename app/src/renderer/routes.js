export default [
  {
    path: '/',
    name: 'quizz',
    component: require('components/Quizz')
  },
  {
    path: '/manage',
    component: require('components/Manage')
  },
  {
    path: '*',
    redirect: '/'
  }
]
