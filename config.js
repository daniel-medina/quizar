'use strict'

const path = require('path')

var name = 'quizar'

if (process.env.VERSION === 'admin') {
  name = 'quizar-admin'
} else if (process.env.VERSION === 'eleve') {
  name = 'quizar-eleve'
}

let config = {
  // Name of electron app
  // Will be used in production builds
  name: name,

  // Use ESLint (extends `standard`)
  // Further changes can be made in `.eslintrc.js`
  eslint: true,

  // webpack-dev-server port
  port: 9080,

  // electron-packager options
  // Docs: https://simulatedgreg.gitbooks.io/electron-vue/content/en/building_your_app.html
  building: {
    arch: 'x64',
    asar: false,
    dir: path.join(__dirname, 'app'),
    icon: path.join(__dirname, 'icon.ico'),
    ignore: /^\/(src|index\.ejs|icons)/,
    out: path.join(__dirname, 'builds'),
    overwrite: true,
    platform: process.env.PLATFORM_TARGET || 'all'
  }
}

config.building.name = config.name

module.exports = config
