<template>
  <div>
    <h1>Questions ! ( note actuelle : {{ points }} / {{ pointsMax }} )</h1>
    <li v-for="(item, key) in quizz">
      <br /><br />
      <div v-if="item.image != ''">
        <center><img :src="item.image" title="Illustration" /></center>
      </div>
      <br />
      {{ item.intitule }} - {{ key }}
      <br /><br />
      ( sur <strong>{{ item.point }}</strong> points )
      <br />
      <hr />
      <reponses :parent="item.reponse" :points="item.point"></reponses>
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
      shuffle: function (object) {
        var shuffled = []

        /** looping over the object; thus, shuffling */
        object.forEach(function () {
          var randIndex = Math.round(Math.random() * (object.length - 1) + 0)

          /** if the current element isn't already inside the shuffled array, we can push it inside */
          if (shuffled.indexOf(object[randIndex]) === -1) {
            shuffled.push(object[randIndex])
          }
        })

        console.log(shuffled)
        console.log(object)

        return shuffled
      },
      getDb: function () {
        const fs = require('fs')

        if (fs.existsSync('data/db.json')) {
          fs.readFile('data/db.json', 'utf8', function (error, data) {
            if (error) throw error

            /** shuffling the datas */
            this.quizz = this.shuffle(JSON.parse(data))
          }.bind(this))
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
