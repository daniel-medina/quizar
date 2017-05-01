<template>
  <div>
    <h1>Questions ( note actuelle : {{ points }} / {{ pointsMax }} ) - <button v-on:click="rerender()">re-mélanger</button></h1>
    <li v-for="(item, key) in quizz">
      <br /><br />
      <div v-if="item.image != ''">
        <center><img :src="item.image" title="Illustration" /></center>
      </div>
      <br />
      <h4>{{ item.intitule }}</h4>
      <br /><br />
      ( sur <strong>{{ item.points }}</strong> points )
      <br />
      <hr />
      <reponses :data="item.reponses" :points="item.points"></reponses>
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
        theme: 1,
        pointsMax: 0,
        points: 0,
        nbQuestion: 2,
        chrono: 0,
        chronoMax: 60
      }
    },
    components: {
      reponses: require('./Reponse')
    },
    created () {
      this.getDb()
    },
    methods: {
      rerender: function () {
      },
      shuffle: function () {
        const fs = require('fs')
        var data = JSON.parse(fs.readFileSync('data/db.json', 'utf8'))
        var shuffle = []
        var max = data[this.theme].questions.length

        do {
          /** generate a random number between 0 and the question's array length */
          let rand = Math.floor(Math.random() * max + 0)

          /** if the current random number doesn't exist, push it */
          if (shuffle.indexOf(rand) === -1) {
            shuffle.push(data[this.theme].questions[rand])
          }
          /** repeat the loop until the shuffle length becomes inferior to nbQuestion */
        } while (shuffle.length < this.nbQuestion)

        return shuffle
      },
      getDb: function () {
        const fs = require('fs')

        if (fs.existsSync('data/db.json')) {
          this.quizz = this.shuffle()
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
