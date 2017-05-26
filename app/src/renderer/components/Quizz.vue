<template>
  <div>
    <div v-if="start === 1">
      <div class="header col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="menu">
          <li><a href="#" v-on:click="cancel()"><i class="fa fa-times" aria-hidden="true"></i></a></li>
          <div class="pull-right" v-if="validated === 0">
            <li><a href="#" v-on:click="validate()"><i class="fa fa-check" aria-hidden="true"></i></a></li>
          </div>
          <div class="pull-right" v-if="displayNote === 1">
            <li><a href="#" v-on:click="reShuffle()"><i class="fa fa-refresh" aria-hidden="true"></i></a></li>
          </div>
        </div>
      </div>
    </div>
    <div v-if="start === 1">
      <span style="color: red;" v-if="validated === 1">
        <div class="result">
          <div class="announce">résultat</div>

          <div class="progress">
            <div class="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" v-bind:style="percentPoints">
            </div>
          </div>
          <div class="note" v-if="displayNote === 1">
            {{ points }} / {{ pointsMax }}
          </div>
        </div>
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
          <div v-if="displayNote === 1">
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
        <div class="block-alert">
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Il n'y a aucune question dans le thème selectionné.
        </div>
      </div>
    </div>
    <div v-else>
      <div class="choose block">
        <div class="welcome">
          Choisissez une thématique
        </div>
        <div class="col-md-12">
          <form>
            <div class="form-group">
              <select v-model="theme" class="form-control">
                <option v-for="(item, index) in themeList" :value="index">{{ item.theme }}</option>
              </select>
            </div>
            <div class="form-group">
              <input class="form-control" type="number" v-model="nbQuestion" placeholder="Nombre de questions" />
            </div>
          </form>
          <div class="text-center">
            <button class="btn btn-sm btn-danger" v-on:click="launch()">Démarrer</button>
          </div>
        </div>
      </div>
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
        displayNote: 0,
        pointsMax: 0,
        points: 0,
        percentPoints: {
          width: 0 + '%'
        },
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
          var children = this.$children[x].data
          var checked = this.$children[x].checked
          var given = children.given
          var question = this.quizz[x]
          var points = question.points
          var nbCheckedValid = 0
          var nbCheckedInvalid = 0
          var nbValid = 0

          /** counting the amount of valid or invalid checked answers */
          for (var y in children) {
            var index = children[y]
            var value = index.value

            if (value === 1 && checked.includes(Number(y))) {
              nbCheckedValid++
            } else if (value === 0 && checked.includes(Number(y))) {
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

          if (nbCheckedValid === nbValid && nbCheckedInvalid === 0 && nbValid > 0) {
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

        var percent = (this.points / this.pointsMax) * 100
        var color = ''
        var time = 10000

        if (percent <= 5) {
          color = 'red'
          /** since the loading bar is too short, we reduce the delay to show the note */
          time = 2000
        } else if (percent <= 20) {
          color = 'red'
        } else if (percent <= 50) {
          color = 'orange'
        } else {
          color = 'green'
        }

        setTimeout(function () {
          this.percentPoints = {
            width: percent + '%'
          }

          /** must be synced with .progress-bar transition time */
          setTimeout(function () {
            this.displayNote = 1

            this.percentPoints = {
              width: percent + '%',
              background: color
            }
          }.bind(this), time)
        }.bind(this), 100)

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
        this.displayNote = 0
        this.percentPoints = { width: 0 + '%' }

        /** also reinitialize every question's checked arrays */
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
          let question = data[this.theme].questions[rand]

          /** if the current random number doesn't exist, push it */
          if (!shuffle.includes(question)) {
            /** shuffling the answers */
            let oldReponses = question.reponses
            let reponses = this.shuffleReponses(oldReponses)

            question.reponses = reponses
            shuffle.push(question)
          }
          /** repeat the loop until the shuffle length becomes inferior to nbQuestion AND inferior to the maximum amount of questions in the pool */
        } while (shuffle.length < this.nbQuestion && shuffle.length < max)

        return shuffle
      },
      shuffleReponses: function (data) {
        var shuffle = []
        var max = data.length

        do {
          /** generate a random number between 0 and the question's array length */
          let rand = Math.floor(Math.random() * max + 0)

          /** if the current random number doesn't exist, push it */
          if (!shuffle.includes(data[rand])) {
            shuffle.push(data[rand])
          }
          /** repeat the loop until the shuffle length becomes inferior to nbQuestion AND inferior to the maximum amount of questions in the pool */
        } while (shuffle.length < max)

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
