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
    <div class="form">
      <input v-on:keyup.enter="addReponse" maxlength="60" type="text" v-model="form.description" name="description" placeholder="Réponse à insérer" />
    </div>

    <li v-for="(item, index) in reponses">
      <detail :item="item" :index="index" :questionIndex="questionIndex" :themeIndex="themeIndex" :data="data" :updateData="updateData"></detail>
    </li>
  </div>
</template>

<script>
  export default {
    props: ['reponses', 'questionIndex', 'themeIndex', 'data', 'updateData'],
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
          var db = this.data

          /** adding the reponse inside the question using the question's given index */
          db[this.themeIndex].questions[this.questionIndex].reponses.push(added)

          /** now updating the datas */
          this.updateData()

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

.form {
  text-align: right;
  padding: 0;
  margin: 0;

  .title {
    color: $color8;
    text-transform: uppercase;
    font-weight: bold;
    text-align: right;
    font-size: $block-modal-header-font-size - 1px;
    margin-bottom: $block-modal-header-title-margin;
  }

  input {
    transition: border-color $transition;
    color: $color8;
    box-shadow: $block-reponse-form-shadow;

    width: $block-reponse-form-width;
    max-width: $block-reponse-form-width;

    padding: $block-reponse-form-padding;
    border: $block-reponse-form-border;

    font-size: $block-reponse-form-font-size;

    &:focus,&:hover {
      border-color: $color2;
      outline: none;
    }
  }
}
</style>
