<template>
  <div id="question-form">
    <div class="modal" :style="style">
      <div class="block col-md-10 col-xs-12">
        <div class="container col-md-12 col-xs-12">
          <div class="header">
            <div class="bar">
              <div class="pull-right">
                <i v-on:click="show(false)" class="button fa fa-window-close" aria-hidden="true"></i>
              </div>

              <i class="icon fa fa-arrow-circle-right" aria-hidden="true"></i>
              <span v-if="item !== undefined">Modification d'une question - {{ data[themeIndex].theme }}</span>
              <span v-else>Insertion d'une question - {{ data[themeIndex].theme }}</span>
            </div>
          </div>
          <div class="form">
            <div class="title">
              Intitulé <i class="icon fa fa-dot-circle-o" aria-hidden="true"></i>
            </div>

            <!-- if the item is specified or not; edit a question or add one -->
            <textarea v-if="item !== undefined" ref='intitule' class="intitule" v-model="data[themeIndex].questions[index].intitule"></textarea>
            <textarea v-else class="intitule" ref='intitule' v-model="form.intitule"></textarea>
          </div>

          <div class="form">
            <div class="title">
              Explication <i class="icon fa fa-dot-circle-o" aria-hidden="true"></i>
            </div>

            <textarea v-if="item !== undefined" class="explication" v-model="data[themeIndex].questions[index].explication"></textarea>
            <textarea v-else class="intitule" v-model="form.explication"></textarea>
          </div>

          <div class="form">
            <div class="title">
              Points obtenable <i class="icon fa fa-dot-circle-o" aria-hidden="true"></i>
            </div>

            <div class="points">
              <div v-if="item !== undefined" class="number">{{ data[themeIndex].questions[index].points }}</div>
              <div v-else class="number">{{ form.points }}</div>
              <div class="setter">
                <li><i v-on:click="setPoint('plus')" class="fa fa-plus-square" aria-hidden="true"></i></li>
                <li><i v-on:click="setPoint('minus')" class="fa fa-minus-square" aria-hidden="true"></i></li>
              </div>
            </div>
          </div>

          <div class="form">
            <div class="title">
              Illustration <i class="icon fa fa-dot-circle-o" aria-hidden="true"></i>
            </div>

            <span v-if="item !== undefined">
              <button v-if="item.image !== ''" class="btn btn-md btn-danger" v-on:click="removeIllustration()">supprimer</button>
              <button v-if="item.image !== ''" class="btn btn-md btn-primary" v-on:click="$parent.modal()">afficher</button>
              <button v-if="item.image === ''" class="btn btn-md btn-info" v-on:click="setIllustration()">explorer</button>
            </span>
            <span v-else>
              <div v-if="form.image !== ''" class="pull-left illustration-url">
                URL de l'illustration : {{ form.image.toString() }}
              </div>
              <button class="btn btn-md btn-info" v-on:click="setIllustration()">explorer</button>
            </span>
          </div>

          <div class="validate">
            <button v-if="item !== undefined" class="btn btn-sm btn-success" v-on:click="show(true)">enregistrer</button>
            <button v-if="item === undefined" class="btn btn-sm btn-danger" v-on:click="cancel()">effacer</button>
            <button v-if="item === undefined" class="btn btn-sm btn-primary" v-on:click="add()">ajouter</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'index', 'themeIndex', 'data', 'updateData', 'getData'],
    data () {
      return {
        form: {
          intitule: '',
          explication: '',
          points: 0,
          image: ''
        },
        deploy: false,
        style: {
          visibility: 'hidden',
          opacity: '0'
        }
      }
    },
    created () {
    },
    methods: {
      show: function (action) {
        /** deploy component variable becomes what it is not; false or true */
        this.deploy = !this.deploy

        if (this.deploy) {
          this.style = {
            visibility: 'visible',
            opacity: '1'
          }
        } else {
          this.style = {
            visibility: 'hidden',
            opacity: '0'
          }
        }

        if (action) {
          this.update()
        } else {
          this.cancel()
        }
      },
      add: function () {
        const fs = require('fs-extra')

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
          var source = this.form.image.toString()

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

        if (this.form.intitule !== '') {
          this.data[this.themeIndex].questions.push(toAdd)

          /** now updating the datas */
          this.updateData()

          /** resetting the current form values */
          this.form.intitule = ''
          this.form.explication = ''
          this.form.points = 0
          this.form.image = ''
        }

        this.$refs.intitule.focus()
      },
      update: function () {
        this.updateData()
      },
      cancel: function () {
        if (this.item === undefined) {
          /** reset form's values */
          this.form.intitule = ''
          this.form.explication = ''
          this.form.points = 0
          this.form.image = ''
        } else {
          this.getData()
        }
      },
      setPoint: function (arithmetic) {
        var actual = (this.item !== undefined) ? this.data[this.themeIndex].questions[this.index].points : this.form.points

        if (arithmetic === 'plus') {
          (this.item !== undefined) ? this.data[this.themeIndex].questions[this.index].points++ : this.form.points++
        } else if (arithmetic === 'minus' && actual > 0) {
          (this.item !== undefined) ? this.data[this.themeIndex].questions[this.index].points-- : this.form.points--
        }
      },
      setIllustration: function () {
        const { dialog } = require('electron').remote

        dialog.showOpenDialog({
          filters: [
            { name: 'Images', extensions: ['jpg', 'png', 'gif', 'bmp', 'jpeg'] }
          ],
          properties: ['openFile']
        }, function (file) {
          /** if the user is creating a question ... */
          if (this.item === undefined) {
            this.form.image = file

            /** else, we live-insert the illustration */
          } else {
            this.insertIllustration(file)
          }
        }.bind(this))
      },
      insertIllustration: function (file) {
        const fs = require('fs-extra')

        if (file !== undefined) {
          var token = Math.round(Math.random() * (99999999999999999 - 1) + 1)
          var token2 = Math.round(Math.random() * (999999999 - 1) + 1)
          var additionnal = 'app/dist/illustration/'
          var destination = token + '/' + token2 + '.png'
          var source = file.toString()

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
          var image = 'illustration/' + destination

          /** change the image variable to the one we just choosed */
          this.data[this.themeIndex].questions[this.index].image = image

          /** then update the JSON database */
          this.updateData()
        }
      },
      removeIllustration: function () {
        const { dialog } = require('electron').remote
        const fs = require('fs-extra')

        var image = this.data[this.themeIndex].questions[this.index].image

        dialog.showMessageBox({ type: 'question', buttons: ['Non', 'Oui'], title: 'Suppression d\'une illustration', message: 'Êtes-vous sûr de vouloir supprimer l\'illustration attachée à cette question ?' }, function (choice) {
          if (choice) {
            /** first, we delete the image; the path depends on the env variable */
            if (this.$root.env === 'development') {
              fs.unlinkSync('app/dist/' + image)
            } else {
              fs.unlinkSync('resources/app/dist/' + image)
            }

            /** then change the image variable of the question to nothing */
            this.data[this.themeIndex].questions[this.index].image = ''

            /** finally we update the JSON database */
            this.updateData()
          }
        }.bind(this))
      }
    }
  }
</script>

<style lang="scss" scoped>
/** Importing variables file */
@import '../../sass/variables.scss';

.button {
  transition: $transition;
  font-size: $block-header-button-size - 3px;

  color: $color2;

  &:hover {
    cursor: pointer;
    color: $color3;
  }
}

.icon {
  font-size: $block-header-button-size - 6px;
}

#question-form {
  text-align: center;

  .illustration-url {
    color: $color7;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow-y: auto;

    z-index: 2;

    background: $modal-background;
    transition: $transition;

    height: 100%;
    width: 100%;

    /** block inside the modal; different than original blocks */
    .block {
      border: $block-modal-border;
      border-radius: $block-modal-border-radius;
      overflow-y: auto;
      background: none;
      box-shadow: none;

      .container {
      background: white;
      padding: $block-modal-container-padding;
      border-radius: $block-modal-container-border-radius;

      .form {
        text-align: right;
        padding: $block-modal-form-margin;

        .title {
          color: $color8;
          text-transform: uppercase;
          font-weight: bold;
          text-align: right;
          font-size: $block-modal-header-font-size - 1px;
          margin-bottom: $block-modal-header-title-margin;
        }

        textarea {
          resize: none;
          transition: border-color $transition;
          color: $color8;
          box-shadow: $block-modal-form-shadow;

          width: $block-modal-form-width;
          max-width: $block-modal-form-width;
          min-height: $block-modal-form-min-height;
          max-height: $block-modal-form-max-height;

          padding: $block-modal-form-padding;
          border-radius: $block-modal-form-border-radius;
          border: $block-modal-form-border;

          font-size: $block-modal-form-font-size;

          &:focus,&:hover {
            border-color: $color2;
            outline: none;
          }
        }

        .points {
           .number {
            display: inline;
            font-weight: bold;
            color: $form-setter-number-color;
            font-size: $form-setter-number-size;
          }

          .setter {
            float: right;
            position: relative;
            top: 3px;
            left: 10px;

            color: $form-setter-number-color;
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

      .header {
        text-align: left;
        border-bottom: $separator;
        color: $color8;

        .bar {
          margin: $block-modal-margin;

          text-transform: uppercase;
          font-size: $block-modal-header-font-size;
          font-weight: bold;
        }
      }

      .validate {
        border-top: $separator;
        text-align: center;
        margin: $block-modal-validate-margin;
        padding: $block-modal-validate-padding;
      }
      }
    }
  }
}
</style>
