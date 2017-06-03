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
    <div class="block-header" :style="styleHeader">
      <div class="pull-right">
        <i :class="(!edit) ? 'button fa fa-pencil-square' : 'button fa fa-check-square'" aria-hidden="true" v-on:click="editTheme()"></i>&nbsp;
        <i class="button fa fa-window-close" aria-hidden="true" v-on:click="deleteTheme()"></i>
      </div>

      <div class="display">
        <i v-on:click="display()" :class="(deploy) ? 'button fa fa-arrow-circle-down' : 'button fa fa-arrow-circle-right'" aria-hidden="true"></i>
      </div>

      <div class="title" v-if="!edit">
        {{ item.theme }}
      </div>
      <div class="title" v-else>
        <form v-on:submit.prevent="editTheme()" style="display: inline">
          <input class="edit" v-model="$parent.data[index].theme" maxlength="70" />
        </form>
      </div>
    </div>
    <div class="block col-md-12 col-xs-12 col-sm-12 col-lg-12" :style="style" v-if="deploy">
      <questionForm :themeIndex="index" :data="data" :updateData="updateData" :getData="getData"></questionForm>
      <questions :questions="item.questions" :themeIndex="index" :data="data" :updateData="updateData" :getData="getData"></questions>

      <div class="add col-md-12 col-xs-12 col-sm-12 col-lg-12" v-on:click="add()">
        <i class="fa fa-plus-circle" aria-hidden="true"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'index', 'data', 'updateData', 'getData'],
    data () {
      return {
        edit: false,
        deploy: false,
        /** soon... */
        style: {},
        styleHeader: {
          'border-radius': '3px',
          'margin-bottom': '5px'
        }
      }
    },
    components: {
      questions: require('./Question'),
      questionForm: require('../Dynamic/QuestionForm')
    },
    created () {
      /** experiment to change position of each theme; to finish later */
      /** let count = 0

      while (count < 1) {
        let last = this.$parent.data.length
        let newPosition = (this.index - 1 >= 0) ? this.index - 1 : 0
        let toPush = newPosition + 1
        let old = this.$parent.data.splice(1, 1)

        console.log('new position : ' + newPosition)
        console.log('old data : ' + old)
        console.log('push here : ' + toPush)

        count++
      } */
    },
    methods: {
      display: function () {
        /** deploy component variable becomes what it is not; false or true */
        this.deploy = !this.deploy

        /** css variables here are static */
        if (this.deploy) {
          this.styleHeader = {
            'border-top-left-radius': '3px',
            'border-top-right-radius': '3px',
            'margin-bottom': '0'
          }
        } else {
          this.styleHeader = {
            'border-radius': '3px',
            'margin-bottom': '5px'
          }
        }
      },
      add: function () {
        this.$children[0].show()
      },
      editTheme: function () {
        /** edit variable becomes what it is not; false or true */
        this.edit = !this.edit

        if (!this.edit) {
          this.$parent.updateData()
        }
      },
      deleteTheme: function () {
        const { dialog } = require('electron').remote

        dialog.showMessageBox({ type: 'question', buttons: ['Non', 'Oui'], title: 'Suppression d\'une thématique', message: 'Êtes-vous sûr de vouloir supprimer ce thème ? Cela supprimera également toute les questions et réponses associées.' }, function (choice) {
          if (choice) {
            this.$parent.data.splice(this.index, 1)

            /** now updating the datas */
            this.$parent.updateData()
          }
        }.bind(this))
      }
    }
  }
</script>

<style lang="scss" scoped>
/** Importing variables file */
@import '../../sass/variables.scss';

/** font-awesome's icon buttons */
.button {
  color: white;
  transition: $transition;
  font-size: $block-header-button-size;

  &:hover {
    cursor: pointer;
    color: $color2;
  }
}

.theme {
  margin: 10px;
}

/** add a question button */
.add {
  text-align: center;
  background: $color4;
  font-size: $question-add-font-size;
  transition: $transition;

  /** synced to header's  */
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;

  &:hover {
    background: $color2;
    cursor: pointer;
  }
}    

/** same values as .title (with some hacks), so it's alike */
.edit {
  display: inline;
  background: none;
  border: 0;
  margin: 0;
  padding: 0;
  width: 87%;
  text-transform: uppercase;
  font-weight: bold;
  font-size: $block-header-font-size;
  color: $color2;

  &:focus {
    box-shadow: none;
    border: 0;
    outline: none;
  }
}

/**
 * applying changes to block's border
 * relative to the current page's needs
 */
.block-header {
  background: $color4;
  padding: $block-header-padding;
  box-shadow: $block-shadow;

  .title {
    display: inline;
    text-transform: uppercase;
    font-weight: bold;
    font-size: $block-header-font-size;
    color: $block-text-color;
  }

  .display {
    margin: $block-header-display-margin;
    display: inline;
  }
}

.block {
  transition: $transition ease;
  margin-bottom: 10px;

  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
