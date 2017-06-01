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
      <detail :item="item" :index="index" :themeIndex="themeIndex"></detail>
    </li>
    <form method="post" v-on:submit="addQuestion"><textarea v-model="form.intitule" placeholder="Intitulé de la question"></textarea> <textarea v-model="form.explication" placeholder="Explication de la question"></textarea> <input type="number" step="any" v-model="form.points" name="points" placeholder="Points à gagner" />
      <div v-if="form.image.length === 0">
        <button v-on:click="setImage">Définir l'illustration</button>
      </div>
      <div v-else>
        Illustration choisie : {{ form.image[0] }}
      </div>
      <input type="submit" value="Ajouter" />
    </form>
  </div>
</template>

<script>
  export default {
    props: ['data', 'themeIndex'],
    components: {
      detail: require('./QuestionDetail')
    },
    data () {
      return {
        form: {
          intitule: '',
          explication: '',
          points: '',
          image: ''
        }
      }
    },
    methods: {
      addQuestion: function (form) {
        form.preventDefault()
        const fs = require('fs')

        var intitule = this.form.intitule
        var explication = this.form.explication
        var points = this.form.points
        var image = ''

        /** first we move the image, if it exist, in the data folder; also generate random tokens */
        if (this.form.image.length > 0) {
          var token = Math.round(Math.random() * (99999999999999999 - 1) + 1)
          var token2 = Math.round(Math.random() * (999999999 - 1) + 1)
          var additionnal = 'app/dist/illustration/'
          var destination = token + '/' + token2 + '.png'
          var source = this.form.image[0]

          /** if quizzar is in production, some variables must change */
          if (this.$root.env !== 'development') {
            /** for this one only we can use the $root variable; App.vue is the holder of the env variable */
            additionnal = 'resources/app/dist/illustration/'
          }

          /** now copying the image to the destination; prefered synchronous version instead of asynchronous */
          if (!fs.existsSync(additionnal)) {
            fs.mkdirSync(additionnal)
          }

          fs.mkdirSync(additionnal + token)
          fs.createReadStream(source).pipe(fs.createWriteStream(additionnal + destination))

          /** final attribution of the image */
          image = 'illustration/' + destination
        } else {
          image = ''
        }

        var toAdd = {
          intitule: intitule,
          explication: explication,
          points: points,
          image: image,
          reponses: []
        }

        this.$parent.$parent.data[this.themeIndex].questions.push(toAdd)

        /** now updating the datas */
        this.$parent.$parent.updateData()

        /** resetting the current form values */
        this.form.intitule = ''
        this.form.explication = ''
        this.form.points = ''
        this.form.image = ''
      },
      setImage: function (e) {
        e.preventDefault()

        const { dialog } = require('electron').remote

        dialog.showOpenDialog({
          filters: [
            { name: 'Images', extensions: ['jpg', 'png', 'gif', 'bmp', 'jpeg'] }
          ],
          properties: ['openFile']
        }, function (file) {
          if (file !== undefined) {
            this.form.image = file
          }
        }.bind(this))
      }
    }
  }
</script>

<style lang="scss" scoped>
/** Importing variables file */
@import '../../sass/variables.scss';

textarea,input {
color: black;
}        

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
</style>
