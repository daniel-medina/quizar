<template>
  <div>
    <div class="header">
      <div class="pull-right">
        <i v-if="item.image !== ''" v-on:click="modal()" class="button fa fa-picture-o" aria-hidden="true"></i>&nbsp;
        <i class="button fa fa-pencil" aria-hidden="true" v-on:click="editIntitule()"></i>&nbsp;
        <i class="button fa fa-close" aria-hidden="true" v-on:click="remove()"></i>
      </div>
      <div class="display">
        <i v-on:click="display()" :class="(deploy) ? 'button fa fa-arrow-circle-down' : 'button fa fa-arrow-circle-right'" aria-hidden="true"></i>
      </div>

      <p class="title" v-html="$root.nl2br($root.escape(item.intitule))" />
      <edit :item="item" :index="index" :themeIndex="themeIndex"></edit>
    </div>
    <div v-if="deploy">
      <div class="explication">
        <div class="pull-right">
          <button v-on:click="editExplication()">E</button>
        </div>
        <p v-html="$root.nl2br($root.escape(item.explication))" />
      </div>

      <reponses :data="item.reponses" :questionIndex="index" :themeIndex="themeIndex"></reponses>
    </div>

    <div class="modal" :style="modalStyle">
      <img v-on:click="modal()" :src="item.image" />
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'index', 'themeIndex'],
    components: {
      reponses: require('./Reponse'),
      edit: require('../Dynamic/Edit')
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
        console.log(this.$children[0])
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

.header {
  background: $question-intitule-background;
  padding: $block-header-padding;
  margin: 5px 0;

  .title {
    display: inline;
    font-size: $block-header-font-size - 3px;
    color: $block-text-color;
  }

  .display {
    margin: $block-header-display-margin;
    display: inline;
  }
}

.edit-intitule {
  display: inline;

  textarea {
    background: none;
    border: 0;
    width: 90%;
    max-width: 90%;
    height: auto;

    font-size: $block-header-font-size - 3px;
    color: $color2;

    resize: none;

    &:focus {
      outline: none;
    }
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
