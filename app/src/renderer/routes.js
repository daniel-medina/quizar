export default [
  {
    path: '/',
    name: 'quizz',
    component: require('components/Quizz')
  },
  {
    path: '/manage',
    component: (process.env.VERSION !== 'eleve') ? require('components/Manage') : require('components/Error')
  },
  {
    path: '/export-import',
    component: require('components/ExportImport')
  },
  {
    path: '*',
    redirect: '/'
  }
]
