<template>
  <div>
    <li v-for="(item, key) in reponses">
      <input type="checkbox" v-on:click="check()" v-model="checked" v-bind:value="key"></input> {{ item.description }}
    </li>
  </div>
</template>

<script>
  export default {
    props: ['parent', 'points'],
    data () {
      return {
        reponses: this.parent,
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
        var data = fs.readFileSync('data/db.json')

        this.reponses = this.$parent.$parent.jsonGetReponse(this.parent)
        this.setMaxPoint(JSON.parse(data))
      },
      setMaxPoint: function (file) {
        this.$parent.pointsMax += Number(this.points)
      },
      check: function () {
        var nbValid = 0
        var nbNotValid = 0
        var nbCorrect = 0

        /** getting the amount of correct answers */
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

        /** now if there is all correct answer checked and zero incorrect answer, gives the point, also, there must not be given point yet to give the points */
        if (nbValid === nbCorrect && nbNotValid === 0 && nbValid > 0 && this.given === 0) {
          this.$parent.points += Number(this.points)
          this.given = 1
        } else if (this.given === 1 && nbNotValid >= 0) {
          /** if the points of this question was given and the checked answers aren't correct, we remove the given points */
          this.given = 0
          this.$parent.points -= Number(this.points)
        }
      },
      setter: function () {
        /** looping through the current question's answers, and sorting them by sending the valid answers to it's array, and the same with the incorrect answers */
        for (var x = 0; x < this.reponses.length; x++) {
          if (this.reponses[x].value === 1) {
            this.valid.push(x)
          } else {
            this.notValid.push(x)
          }
        }
      }
    }
}
</script>

<style scoped>

</style>
