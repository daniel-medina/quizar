<template>
  <div>
    <h1>Quizz</h1>
    <div v-if="start === 1">
      <button v-on:click="reShuffle()">re-mélanger</button>
      <br />
      <button v-on:click="cancel()">annuler</button>
      <br />
      <button v-on:click="validate()">valider</button>
    </div>
    <hr />
    <div v-if="start === 1">
      <span style="color: red;" v-if="validated === 1">
        <br />
        <h2><strong>Note : {{ points }} / {{ pointsMax }}</strong></h2>
        <hr />
      </span>
      <div v-if="quizz.length > 0">
        <li v-for="(item, index) in quizz">
          <br /><br />
          <div v-if="item.image != ''">
            <center><img :src="item.image" title="Illustration" /></center>
          </div>
          <br />
          <h4 v-html="$parent.nl2br($parent.escape(item.intitule))"></h4>
          <br /><br />
          ( sur <strong>{{ item.points }}</strong> points )
          <br />
          <div v-if="validated === 1">
            <br />
            <hr />
            <br />
            <b v-html="$parent.nl2br($parent.escape(item.explication))"></b>
            <br />
            <br />
            <hr />
            <br />
          </div>
          <div v-else>
            <hr />
          </div>
          <reponses :data="item.reponses" :points="item.points"></reponses>
          <br />
          <hr />
        </li>
      </div>
      <div v-else>
        Il n'y a aucune question dans le thème selectionné.
      </div>
    </div>
    <div v-else>
      Choisissez un thème :
      <br />
      <form>
        <select v-model="theme">
          <option v-for="(item, index) in themeList" :value="index">{{ item.theme }}</option>
        </select>
        <br />
        <input type="number" v-model="nbQuestion" placeholder="Nombre de question" />
      </form>
      <br />
      <hr />
      <button v-on:click="launch()">Démarrer</button>
    </div>
  </div>
  </template>

<script>
  export default {
    data () {
      return {
        quizz: [],
        theme: 0,
        themeList: [],
        pointsMax: 0,
        points: 0,
        nbQuestion: '',
        validated: 0,
        start: 0,
        chrono: 0,
        chronoMax: 60
      }
    },
    components: {
      reponses: require('./Reponse')
    },
    created () {
      this.getTheme()
    },
    methods: {
      launch: function () {
        /** disallow invalid amount of questions */
        if (this.nbQuestion > 0) {
          this.start = 1

          this.getDb()
        } else {
          alert('Le nombre de question selectionné doit être supérieur à 0.')
        }
      },
      cancel: function () {
        /** resetting variables to their default values */
        this.start = 0
        this.theme = 0
        this.nbQuestion = ''
      },
      validate: function () {
        for (var x in this.$children) {
          var children = this.$children[x]
          var checked = children.checked
          var given = children.given
          var question = this.quizz[x]
          var points = question.points
          var nbCheckedValid = 0
          var nbCheckedInvalid = 0
          var nbValid = 0

          /** freeze checked array values of all chidrens in order to disallow unchecking or checking any new answer */
          Object.freeze(checked)

          /** counting the amount of valid or invalid checked answers */
          for (var y in checked) {
            var index = checked[y]
            var value = question.reponses[index].value

            if (value === 1) {
              nbCheckedValid++
            } else {
              nbCheckedInvalid++
            }
          }

          /** counting the amount of valid answers */
          for (var z in question.reponses) {
            var value2 = question.reponses[z].value

            if (value2 === 1) {
              nbValid++
            }
          }

          if (nbCheckedValid === nbValid && nbCheckedInvalid === 0) {
            /** we give the points, so the 'given' verification variables goes to 1 */
            given = 1
          } else {
            /** the point isn't given, so nothing changes */
            given = 0
          }

          if (this.validated === 0) {
            /** final validation process, we give the point if it's given, else we remove it */
            if (given === 1) {
              this.points += Number(points)
            }
          }
        }

        /** the quizz now becomes 'validated' and can't be validated anymore */
        this.validated = 1
      },
      getTheme: function () {
        var data = this.$parent.getData()

        this.themeList = data
      },
      getDb: function () {
        /** variable initializations that are re-executed after each reshuffle */
        this.points = 0
        this.pointsMax = 0
        this.validated = 0

        /** also initialize every question's checked arrays */
        for (var x in this.$children) {
          this.$children[x].checked = []
        }

        this.quizz = this.shuffle()

        /** setting maximum obtainable points */
        for (var y in this.quizz) {
          let children = this.quizz[y]

          this.pointsMax += Number(children.points)
        }
      },
      reShuffle: function () {
        this.getDb()
      },
      shuffle: function () {
        var data = this.$parent.getData()
        var shuffle = []
        var max = data[this.theme].questions.length

        do {
          /** generate a random number between 0 and the question's array length */
          let rand = Math.floor(Math.random() * max + 0)

          /** if the current random number doesn't exist, push it */
          if (!shuffle.includes(data[this.theme].questions[rand])) {
            shuffle.push(data[this.theme].questions[rand])
          }
          /** repeat the loop until the shuffle length becomes inferior to nbQuestion AND inferior to the maximum amount of questions in the pool */
        } while (shuffle.length < this.nbQuestion && shuffle.length < max)

        return shuffle
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
