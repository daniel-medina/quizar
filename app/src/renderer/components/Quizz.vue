<template>
  <div>
    <h1>Questions ( note actuelle : {{ points }} / {{ pointsMax }} ) - <button v-on:click="$parent.rerender()">re-mélanger</button></h1>
    <li v-for="(item, key) in quizz">
      <br /><br />
      <div v-if="item.image != ''">
        <center><img :src="item.image" title="Illustration" /></center>
      </div>
      <br />
      {{ item.intitule }} - {{ key }} - id : {{ item.id }}
      <br /><br />
      ( sur <strong>{{ item.point }}</strong> points )
      <br />
      <hr />
      <reponses :parent="item.id" :points="item.point"></reponses>
      <br />
      <hr />
    </li>
  </div>
  </template>

<script>
  export default {
    data () {
      return {
        quizz: [],
        pointsMax: 0,
        points: 0,
        nbQuestion: 2,
        chrono: 0,
        chronoMax: 60
      }
    },
    components: {
      reponses: require('./Question/Reponse')
    },
    created () {
      this.getDb()

      this.$root.$on('setMaxPoint', function (argument) {
        console.log(argument)
      })
    },
    methods: {
      shuffle: function () {
        const fs = require('fs')
        var data = JSON.parse(fs.readFileSync('data/db.json'))

        /* eslint-disable */
        for (var item in data) {
          /* eslint-enable */
          var key = Math.round(Math.random() * (data.length - 1) + 0)
          var match = 0

          /** first we need to check if the current item is present in the quizz object */
          this.quizz.forEach(function (qItem) {
            if (qItem.id === data[key].id) {
              match++
            }
          })

          /** if it isn't inside the quizz object, push it inside */
          if (match === 0 && this.quizz.length < this.nbQuestion) {
            this.quizz.push(data[key])
          }
        }

        /** if the quizz's length is inferior to the nbQuestion variable, restart the function */
        if (this.quizz.length < data.length && this.quizz.length < this.nbQuestion) {
          this.shuffle()
        }
      },
      getDb: function () {
        const fs = require('fs')

        if (fs.existsSync('data/db.json')) {
          this.shuffle()
        } else {
          /** if the database couldn't be found, create it */
          var empty = JSON.stringify([])

          fs.writeFileSync('data/db.json', empty, 'utf8')
        }
      }
    },
    name: 'quizz'
  }
  </script>

<style scoped>
img {
    margin-top: -25px;
    width: 450px;
  }
  </style>
