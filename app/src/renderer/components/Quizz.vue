<template>
  <div>
    <h1>Questions ! ( note actuelle : {{ points }} / {{ pointsMax }} )</h1>
    <li v-for="(item, key) in quizz">
      Question : {{ item.intitule }} ( sur <strong>{{ item.point }}</strong> points )
      <br /><br />
      <center><img :src="item.image" title="Illustration" /></center>
      <br />
      <hr />
      <reponses :parent="key" :points="item.point"></reponses>
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
        points: 0
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
      /** setInterval(function () {
        this.getDb()
      }.bind(this), 5000) */
    },
    methods: {
      getDb: function () {
        const fs = require('fs')

        fs.readFile('db.json', 'utf8', function (error, data) {
          if (error) throw error

          this.quizz = JSON.parse(data)
        }.bind(this))
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
