<template>
  <div>
    <div v-if="start === 1">
      <div class="header col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="menu">
          <span v-if="validated === 0 || validated === 1 && displayNote === 1">
            <li><a href="#" v-on:click="cancel()"><i class="fa fa-times" aria-hidden="true"></i></a></li>
          </span>
          <span v-else>
            <li><a class="disabled"><i class="fa fa-times" aria-hidden="true"></i></a></li>
          </span>
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
        <div class="col-lg-offset-2 col-md-offset-1 col-lg-8 col-sm-12 col-md-10 col-xs-12">
          <div class="result">
            <div class="announce">résultat</div>
            <div class="progress">
              <div class="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" v-bind:style="percentPoints">
              </div>
            </div>
            <div class="note" v-if="displayNote === 1">
              {{ Math.round(((points / pointsMax) * 100) / 5) }} / 20
            </div>
          </div>
        </div>
      </span>
      <div v-if="quizz.length > 0">
        <li v-for="(item, index) in quizz">
          <div class="col-lg-offset-2 col-md-offset-1 col-lg-8 col-sm-12 col-md-10 col-xs-12">
            <div class="block question col-md-12 col-lg-12 col-xs-12">
              <div class="points">
                <div class="badge">
                  {{ item.points }} {{ (item.points > 1) ? 'points' : 'point' }}
                </div>
              </div>
              <div class="illustration" v-if="item.image != ''">
                <illustration :image="item.image"></illustration>
              </div>
              <div class="intitule">
                <p v-html="$parent.nl2br($parent.escape(item.intitule))" />
              </div>
              <div class="explication" v-if="displayNote === 1">
                <p v-html="$parent.nl2br($parent.escape(item.explication))" />
              </div>
              <div v-else>
              </div>
              <reponses :data="item.reponses" :points="item.points"></reponses>
            </div>
          </div>
        </li>
      </div>
      <div v-else>
        <div class="block-alert">
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Il n'y a aucune question dans le thème selectionné.
        </div>
      </div>
    </div>
    <div class="wrapper" v-else>
      <div class="choose block">
        <div class="welcome">
          Choisissez une thématique
        </div>
        <div class="col-md-12">
          <form>
            <div class="form-group">
              <select v-if="!all" v-model="theme" :class="(all) ? 'disabled form-control' : 'form-control'">
                <option v-if="!all" v-for="(item, index) in themeList" :value="index">{{ item.theme }}</option>
              </select>
            </div>
            <div class="checkbox">
              <label v-on:click="universe()">
                <i :class="(all) ? 'fa fa-check-square square' : 'fa fa-square'" aria-hidden="true"></i> être interrogé sur TOUS les thèmes
              </label>

              <div class="nbQuestion">
                <div class="number">{{ nbQuestion }}</div>
                <div class="setter">
                  <li><i v-on:click="setAmount('plus')" class="fa fa-plus-square" aria-hidden="true"></i></li>
                  <li><i v-on:click="setAmount('minus')" class="fa fa-minus-square" aria-hidden="true"></i></li>
                </div>
              </div>
            </div>
          </form>
          <br />
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
        all: false,
        nbQuestion: 1,
        validated: 0,
        start: 0,
        chrono: 0,
        chronoMax: 60
      }
    },
    components: {
      reponses: require('./Reponse'),
      illustration: require('./Dynamic/Illustration')
    },
    created () {
      this.getTheme()
    },
    methods: {
      getImage: function (url) {
        const fs = require('fs')

        let image = fs.readFileSync('data/test.png', 'utf8')
        return image
      },
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
        this.nbQuestion = 1
      },
      validate: function () {
        /** must filter the childrens components to use only the questions */
        var filtered = this.$children.filter(function (item) {
          return item.data !== undefined
        })

        for (var x in filtered) {
          var children = filtered[x].data
          var checked = filtered[x].checked
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
        var time = 5000

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

          /** must be synced with $result-delay inside the SASS variables */
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
      universe: function () {
        this.all = !this.all
      },
      setAmount: function (arithmetic) {
        /** kind of same function as setPoint in QuestionForm */
        var actual = this.nbQuestion

        if (arithmetic === 'plus') {
          this.nbQuestion++
        } else if (arithmetic === 'minus' && actual > 1) {
          this.nbQuestion--
        }
      },
      reShuffle: function () {
        this.getDb()
      },
      shuffle: function () {
        var data = this.$parent.getData()
        var shuffle = []
        var universe = []
        var max = 0

        /** if the user choosed to be generated a quizz taking questions of all the themes */
        if (this.all) {
          /** preparing value and array for the shuffling */
          for (let x in data) {
            max += data[x].questions.length

            for (let y in data[x].questions) {
              universe.push(data[x].questions[y])
            }
          }

          /** proceeds to loop into the different themes */
          let nb = universe.length

          if (nb > 0) {
            /** the do ... while loop will be a bit different than the theme specific shuffling */
            do {
              let rand = Math.floor(Math.random() * nb + 0)
              let question = universe[rand]

              if (!shuffle.includes(question)) {
                let oldReponses = question.reponses
                let reponses = this.shuffleReponses(oldReponses)

                question.reponses = reponses
                shuffle.push(question)
              }
            } while (shuffle.length < this.nbQuestion && shuffle.length < nb)
          }
        } else {
          max = data[this.theme].questions.length

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
        }

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

<style lang="scss" scoped>
/** Importing variables file */
@import '../sass/variables.scss';

.wrapper {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 100%;
  width: 100%;
  padding-bottom: $footer-height;
}

.points {
  text-align: right;
  font-weight: bold;
  text-transform: uppercase;
  font-size: $question-points-font-size;

  margin: 0;
  padding: 0;

  .badge {
    background: $question-badge-background;
    padding: $question-badge-padding;
    font-size: $question-badge-font-size;

    border-radius: 0;
    border-bottom-left-radius: $question-badge-border-radius;
    border-top-right-radius: $question-badge-border-radius;
    box-shadow: $question-badge-shadow;
  }
}

.header {
  position: fixed;
  top: 0;
  z-index: 1;
  padding: $header-padding;
  box-shadow: $header-shadow;
  background: $header-background;

    .menu {
      li {
        list-style: none;
        display: inline;

        padding: $header-menu-button-padding;
        font-size: $header-menu-button-font-size;
        text-shadow: $menu-shadow;

        a {
          color: $header-menu-button-color;
          transition: $transition;

          &:hover {
            color: $header-menu-button-color-current;
          }
        }

        .router-link-exact-active {
          color: $header-menu-button-color-current;
        }
      }
    }
  }

.choose {
  width: $choose-width;
  padding-bottom: $choose-padding-bottom;

  .welcome {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: $welcome-font-size;
    margin: $welcome-margin;
  }
  
  .form-control {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: bold;
  }

  .checkbox {
    margin: $choose-checkbox-margin;
  
    input {
      visibility: hidden;
    }

    label {
      width: 100%;

      text-transform: uppercase;
      padding: $choose-checkbox-label-padding;
      font-size: $choose-checkbox-label-font-size;
      font-weight: bold;

      transition: $transition;
    }
  }

  .disabled {
    background: $shadow-dark;
  }

  .nbQuestion {
    position: relative;
    bottom: 30px;
    float: right;
    text-align: right;

    .number {
      position: relative;
      right: 10px;
      display: inline;
      font-weight: bold;
      color: white;
      text-shadow: 1px 1px 2px $shadow-darker;
      font-size: $form-setter-number-size;
    }

    .setter {
      float: right;
      position: relative;
      top: 2px;

      color: white;
      text-shadow: 1px 1px 2px $shadow-darker;
      font-size: $form-setter-interval-size;

      li {
        display: block;
        transition: $transition;

        &:hover {
          cursor: pointer;
          color: $color2
        }             
      }
    }
  }
}

  .question {
    padding: $question-padding;
    margin: $question-margin;

    .explication {
      text-align: justify;
      font-size: $question-intitule-font-size;
      font-weight: bold;
      text-shadow: $question-text-shadow;

      margin: $question-intitule-margin;

      background: $question-explication-background;

      p {
        padding: $question-intitule-padding;
        margin: 0;
      }
    }

    .intitule {
      text-align: justify;
      font-size: $question-intitule-font-size;
      text-shadow: $question-text-shadow;
      font-weight: bold;
      margin: $question-intitule-margin;

      background: $question-intitule-background;

      p {
        padding: $question-intitule-padding;
        margin: 0;
      }
    }
  }

  .result {
    color: $result-font-color;
    margin-top: $result-margin;
    margin-bottom: $result-margin;
    padding: 5px 10px;
    box-shadow: $block-dark-shadow;
    
    .announce {
      color: black;
      text-align: center;
      text-transform: uppercase;
      font-weight: bold;
      font-size: $result-announce-font-size;
      margin: $result-announce-margin;
    }

    .progress-bar {
      transition: $result-delay;
    }

    .note {
      font-size: 20px;
      text-align: center;
      font-weight: bold;
    }
  }  
</style>
