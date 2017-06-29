<template>
  <div>
    <div class="header col-md-12 col-xs-12 col-sm-12 col-lg-12">
      <div class="pull-right">
        <i v-if="item.image !== ''" v-on:click="modal()" class="button fa fa-picture-o" aria-hidden="true"></i>&nbsp;
        <i class="button fa fa-pencil" aria-hidden="true" v-on:click="editIntitule()"></i>&nbsp;
        <i class="button fa fa-close" aria-hidden="true" v-on:click="remove()"></i>
      </div>
      <div class="display">
        <i v-on:click="display()" :class="(deploy) ? 'button fa fa-arrow-circle-down' : 'button fa fa-arrow-circle-right'" aria-hidden="true"></i>
      </div>

      <p class="title" v-html="$root.nl2br($root.escape(item.intitule))" />
      <edit :item="item" :index="index" :themeIndex="themeIndex" :data="data" :updateData="updateData" :getData="getData"></edit>
    </div>
    <div v-if="deploy">
      <div class="explication">
        <p class="col-md-12 col-xs-12 col-sm-12 col-lg-12" v-html="$root.nl2br($root.escape(item.explication))" />
      </div>

      <reponses :reponses="item.reponses" :questionIndex="index" :themeIndex="themeIndex" :data="data" :updateData="updateData"></reponses>
    </div>

    <div class="modal" :style="modalStyle">
      <img v-on:click="modal()" :src="item.image" />
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'index', 'themeIndex', 'data', 'updateData', 'getData'],
    components: {
      reponses: require('./Reponse'),
      edit: require('../Dynamic/QuestionForm')
    },
    data () {
      return {
        edit: {
          intitule: false,
          explication: false,
          textarea: ''
        },
        deploy: false,
        modalDeploy: false,
        modalStyle: {
          visibility: 'hidden',
          opacity: '0'
        }
      }
    },
    created () {
    },
    methods: {
      display: function () {
        /** deploy component variable becomes what it is not; false or true */
        this.deploy = !this.deploy
      },
      editIntitule: function () {
        this.$children[0].show()
      },
      remove: function () {
        const { dialog } = require('electron').remote

        dialog.showMessageBox({ type: 'question', buttons: ['Non', 'Oui'], title: 'Suppression d\'une question', message: 'Êtes-vous sûr de vouloir supprimer cette question ? Cela supprimera également les questions associées.' }, function (choice) {
          if (choice) {
            this.$parent.$parent.$parent.data[this.themeIndex].questions.splice(this.index, 1)

            /** now updating the datas */
            this.$parent.$parent.$parent.updateData()
          }
        }.bind(this))
      },
      modal: function () {
        if (!this.modalDeploy) {
          this.modalDeploy = !this.modalDeploy

          this.modalStyle = {
            visibility: 'visible',
            opacity: '1'
          }
        } else {
          this.modalDeploy = !this.modalDeploy

          this.modalStyle = {
            visibility: 'hidden',
            opacity: '0'
          }
        }
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
  font-size: $block-header-button-size - 3px;

  &:hover {
    cursor: pointer;
    color: $color2;
  }
}

.explication {

  p {
    font-weight: bold;
    text-align: justify;
    background: $question-explication-background;
    font-size: $block-header-font-size - 5px;
    padding: $question-explication-padding;
    margin: 0;
  }
}

.header {
  background: $question-intitule-background;
  padding: $block-header-padding;
  margin: $block-header-margin;

  .title {
    display: inline;
    font-size: $block-header-font-size - 3px;
    font-weight: bold;
    color: $block-text-color;
  }

  .display {
    margin: $block-header-display-margin;
    display: inline;
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  z-index: 2;

  background: $modal-background;
  transition: $transition;

  height: 100%;
  width: 100%;

  img {
    max-height: $question-illustration-modal-height;
    max-width: $question-illustration-modal-width;
    border: 0;
    border-radius: 1px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
