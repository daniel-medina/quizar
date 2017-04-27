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
      jsonGetReponse: function (id) {
        const fs = require('fs')
        var data = fs.readFileSync('data/db.json')

        for (var x = 0; x < JSON.parse(data).length; x++) {
          var item = JSON.parse(data)[x]

          if (item.id === id) {
            return item.reponse
          }
        }
      },
      /** check if the generated ID isn't already in the database */
      jsonCheck: function (db, genId) {
        var match = 0

        db.forEach(function (item) {
          if (item.id === genId) {
            match++
          }
        })

        if (match > 0) {
          return true
        } else {
          return false
        }
      },
      /** generate an ID for a new question; generate a new one if the generated ID already exist */
      jsonId: function () {
        const fs = require('fs')
        var id = Math.round(Math.random() * (99999999 - 0) + 0)
        var data = fs.readFileSync('data/db.json')
        var check = this.jsonCheck(JSON.parse(data), id)

        console.log(check)

        if (check) {
          /** if the generated id is already present in the database */
          return this.jsonId()
        } else {
          return id
        }
      },
      jsonAddReponse: function (id, add) {
        const fs = require('fs')
        var data = JSON.parse(fs.readFileSync('data/db.json'))

        for (var x = 0; x < data.length; x++) {
          if (data[x].id === id) {
            data[x].reponse.push(add)
          }
        }

        fs.writeFileSync('data/db.json', JSON.stringify(data))
      },
      jsonDeleteReponse: function (id, key) {
        const fs = require('fs')
        var data = JSON.parse(fs.readFileSync('data/db.json'))

        for (var x = 0; x < data.length; x++) {
          if (data[x].id === id) {
            data[x].reponse.splice(key, 1)
          }
        }

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
