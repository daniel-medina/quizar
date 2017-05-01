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
    render: function () {
    },
    methods: {
      /** Global methods */
      getData: function () {
        const fs = require('fs')
        var db = fs.readFileSync(this.dbLocation, 'utf8')

        return JSON.parse(db)
      },
      writeDb: function (write) {
        const fs = require('fs')

        fs.writeFileSync(this.dbLocation, write, 'utf8')
      },
      dbExist: function () {
        const fs = require('fs')

        return fs.existsSync(this.dbLocation)
      }
    }
  }
</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body { height: 100%; }

  body {
    align-items: center;
    background:
      radial-gradient(
        ellipse at center,
        rgba(255, 255, 255, 1) 0%,
        rgba(229, 229, 229, .85) 100%
      );
    background-position: center;
    font-family: Lato, Helvetica, sans-serif;
    justify-content: center;
    text-align: center;
  }

  li {
    list-style: none;
  }
</style>
