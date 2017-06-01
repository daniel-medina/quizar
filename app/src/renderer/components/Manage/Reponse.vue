/** This file is part of Quizzar.
 * Copyright (C) 2017 Daniel Medina
 *
 * Quizzar is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Quizzar is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Quizzar.  If not, see <http://www.gnu.org/licenses/>.
 */

<template>
  <div>
    <li v-for="(item, index) in data">
      <detail :item="item" :index="index" :questionIndex="questionIndex" :themeIndex="themeIndex"></detail>
    </li>
    <br />

    <form method="post" v-on:submit="addReponse"><input type="text" v-model="form.description" name="description" placeholder="Texte de la réponse" /> - <input type="checkbox" name="value" v-model="form.value" v-bind:true-value="1" v-bind:false-value="0" /> bonne réponse <input type="submit" value="Ajouter" /></form>
  </div>
</template>

<script>
  export default {
    props: ['data', 'questionIndex', 'themeIndex'],
    data () {
      return {
        form: {
          description: '',
          value: 0
        }
      }
    },
    components: {
      detail: require('./ReponseDetail')
    },
    methods: {
      addReponse: function (form) {
        form.preventDefault()

        var description = this.form.description
        var value = this.form.value
        var added = {
          description: description,
          value: value
        }

        /** the description must be more than one character long */
        if (description.length > 0) {
          var db = this.$parent.$parent.$parent.$parent.data

          /** adding the reponse inside the question using the question's given index */
          db[this.themeIndex].questions[this.questionIndex].reponses.push(added)

          /** now updating the datas */
          this.$parent.$parent.$parent.$parent.updateData()

          /** resetting the current form values */
          this.form.description = ''
          this.form.value = 0
        }
      }
    }
}
</script>

<style lang="scss" scoped>
/** Importing variables file */
@import '../../sass/variables.scss';

input {
  color: black;
}
</style>
