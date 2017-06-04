/** This file is part of Quizzar.
 * Copyright (C) 2017 Daniel Medina
 *
 * Quizzar is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Quizzar is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Quizzar.  If not, see <http://www.gnu.org/licenses/>.
 */

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
