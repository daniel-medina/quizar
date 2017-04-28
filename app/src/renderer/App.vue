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
    store,
    render: function () {
    },
    methods: {
      /** Global methods */
      jsonAddReponse: function (indexQuestion, reponse) {
        const fs = require('fs')
        var data = JSON.parse(fs.readFileSync('data/db.json'))

        data[indexQuestion].reponse.push(reponse)

        fs.writeFileSync('data/db.json', JSON.stringify(data))
      },
      jsonDeleteReponse: function (indexQuestion, indexReponse) {
        const fs = require('fs')
        var data = JSON.parse(fs.readFileSync('data/db.json'))

        data[indexQuestion].reponse.splice(indexReponse, 1)

        fs.writeFileSync('data/db.json', JSON.stringify(data))
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
