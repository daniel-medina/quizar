<template>
  <div>
    <h1>Questions ! ( note actuelle : {{ points }} / {{ pointsMax }} )</h1>
    <li v-for="(item, key) in quizz">
      <br /><br />
      <div v-if="item.image != ''">
      <center><img :src="item.image" title="Illustration" /></center>
      </div>
      <br />
      {{ item.intitule }}
      <br /><br />
      ( sur <strong>{{ item.point }}</strong> points )
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
