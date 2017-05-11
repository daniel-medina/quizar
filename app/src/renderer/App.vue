<template>
  <div id="#app">
    <router-link to="/">Question</router-link>
    <router-link to="/manage">Gestion</router-link>
    <router-link to="/export-import">Export/Import</router-link>

    <hr />

    <router-view></router-view>
  </div>
  </template>

<script>
  import store from 'renderer/vuex/store'

  export default {
    data () {
      return {
        dbLocation: 'data/db.json'
      }
    },
    store,
    created () {
      if (this.dbExist()) {
        var data = this.getData()
        if (data[this.theme].questions.length > 0) {
          this.quizz = this.shuffle()
        }
      } else {
        /** if the database couldn't be found, create it */
        var empty = JSON.stringify([])

        this.writeDb(empty)
      }
    },
    methods: {
      /** Global methods */
      getData: function () {
        const fs = require('fs')
        var db = fs.readFileSync(this.dbLocation, 'utf8')

        return JSON.parse(db)
      },
      writeDb: function (write) {
        const fs = require('fs-extra')

        if (!fs.existsSync('data')) {
          fs.mkdirSync('data')
        }

        fs.writeFileSync(this.dbLocation, write, 'utf8')
      },
      dbExist: function () {
        const fs = require('fs')

        return fs.existsSync(this.dbLocation)
      },
      escape: function (string) {
        var escape = document.createElement('textarea')
        escape.textContent = string

        return escape.innerHTML
      },
      nl2br: function (str, isXhtml) {
        var breakTag = (isXhtml || typeof isXhtml === 'undefined') ? '<br />' : '<br>'
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2')
      }
    }
  }
</script>

<style lang="scss">
$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
  @import "~bootstrap-sass/assets/stylesheets/_bootstrap.scss";

  /** Importing variables file */
  @import 'sass/variables.scss';

  li {
    list-style: none;
  }
</style>
