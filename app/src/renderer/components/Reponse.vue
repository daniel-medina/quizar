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
  <div class="form-group">
    <li v-for="(item, key) in data">
      <div class="checkbox col-md-6 col-xs-12 col-sm-6 col-lg-6">
        <!-- answer block -->
        <label v-if="$parent.displayNote === 0">
          <table>
            <tr>
              <td class="col-sm-12 col-lg-12 col-xs-12 col-md-12">{{ item.description }}</td>
              <td>
                <input v-if="$parent.validated === 0" type="checkbox" v-model="checked" v-bind:value="key"></input>
                <span v-if="isChecked(key)">
                  <i class="fa fa-check-square square" aria-hidden="true"></i>
                </span>
                <span v-else>
                  <i class="fa fa-square square" aria-hidden="true"></i>
                </span>
              </td>
            </tr>
          </table>
        </label>

        <!-- result answer block -->
        <label :class="(item.value === 1) ? 'valid' : 'not-valid'" v-if="$parent.displayNote === 1">
          <table>
            <tr>
              <td class="col-sm-12 col-lg-12 col-xs-12 col-md-12">{{ item.description }}</td>
              <td>
                <span v-if="isChecked(key)">
                  <i class="fa fa-check-square square" aria-hidden="true"></i>
                </span>
                <span v-else>
                  <i class="fa fa-square square" aria-hidden="true"></i>
                </span>
              </td>
            </tr>
          </table>
        </label>
      </div>
    </li>
  </div>
</template>

<script>
  export default {
    props: ['data'],
    data () {
      return {
        edit: 0,
        checked: [],
        given: 0
      }
    },
    created () {
    },
    methods: {
      isChecked: function (key) {
        if (this.checked.includes(key)) {
          return true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
/** Importing variables file */
@import '../sass/variables.scss';

table {
  tr {
    td {
      vertical-align: middle;
      text-align: justify;
    }
  }
}

.col-md-6 {
  padding: $question-reponse-col-padding;
}

.checkbox {
  margin: $question-reponse-checkbox-margin;

  input {
    visibility: hidden;
  }

  label {
    width: 100%;
    border-radius: $question-reponse-label-border-radius;
    background: $question-reponse-label-background;
    border: $question-reponse-label-border;

    padding: $question-reponse-label-padding;
    font-size: $question-reponse-label-font-size;
    text-shadow: $question-text-shadow;
    font-weight: bold;

    transition: $transition;
    word-break: break-all;

    &:hover {
      border: $question-reponse-label-border-hover;
    }
  }

  label.valid {
    background: $question-reponse-label-valid-background;
    text-shadow: $question-text-shadow;
  }

  label.not-valid {
    background: $question-reponse-label-not-valid-background;
    text-shadow: $question-text-shadow;
  }

  .square {
    padding: 0;
    margin: 0;
    font-size: $question-reponse-square-size;
  }
}
</style>
