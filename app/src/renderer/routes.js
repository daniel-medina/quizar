export default [
  {
    path: '/',
    name: 'quizz',
    component: require('components/Quizz')
  },
  {
    path: '*',
    redirect: '/'
  }
]
