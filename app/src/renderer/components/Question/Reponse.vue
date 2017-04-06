<template>
  <div>
    {{ checked }}
    <li v-for="(item, key) in reponses">
      <input type="checkbox" v-on:click="check()" v-model="checked" v-bind:value="key"></input> {{ item.description }} - value : {{ item.value }} - key : {{ key }}
    </li>
  </div>
</template>

<script>
  export default {
    props: ['parent', 'points'],
    data () {
      return {
        reponses: [],
        checked: [],
        notValid: [],
        valid: [],
        given: 0
      }
    },
    created () {
      this.getDb()
      this.setter()
    },
    methods: {
      getDb: function () {
        const fs = require('fs')

        fs.readFile('db.json', 'utf8', function (error, data) {
          if (error) throw error

          this.reponses = JSON.parse(data)[this.parent].reponse
          this.setMaxPoint(JSON.parse(data))
        }.bind(this))
      },
      setMaxPoint: function (file) {
        this.$parent.pointsMax += this.points
      },
      check: function () {
        var nbValid = 0
        var nbNotValid = 0
        var nbCorrect = 0

        for (var y = 0; y < this.valid.length; y++) {
          nbCorrect++
        }

        for (var x = 0; x < this.checked.length; x++) {
          /** if the current element is in the array of this.valid, counts 1 in nbValid */
          if (this.valid.indexOf(this.checked[x]) !== -1) {
            nbValid++
          } else {
            /** if it's not, counts 1 in nbNotValid */
            nbNotValid++
          }
        }

        console.log('valid : ' + nbValid)
        console.log('not valid : ' + nbNotValid)
        console.log(this.checked)

        /** Now if there is all correct answer checked and zero incorrect answer, gives the point, also, there must not be given point yet to give the points */
        if (nbValid === nbCorrect && nbNotValid === 0 && this.given === 0) {
          this.$parent.points += this.points
          console.log(nbCorrect)
          this.given = 1
        } else if (this.given === 1 && nbNotValid >= 0) {
          /** If the points of this question was given and the checked answers aren't correct, we remove the given points */
          this.given = 0
          this.$parent.points -= this.points
        }
      },
      setter: function () {
        const fs = require('fs')

        fs.readFile('db.json', 'utf8', function (error, data) {
          if (error) throw error

          /** looping through the current question's answers, and sorting them by sending the valid answers to it's array, and the same with the incorrect answers */
          for (var x = 0; x < JSON.parse(data)[this.parent].reponse.length; x++) {
            if (JSON.parse(data)[this.parent].reponse[x].value === 1) {
              this.valid.push(x)
            } else {
              this.notValid.push(x)
            }
          }
        }.bind(this))
      }
    }
}
</script>

<style scoped>

</style>
