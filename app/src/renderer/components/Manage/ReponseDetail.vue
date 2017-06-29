<template>
  <div class="checkbox col-md-6 col-xs-12 col-sm-6 col-lg-6">
    <div :class="(item.value === 1) ? 'question valid' : 'question not-valid'">
      <table>
        <tr>
          <td class="col-sm-12 col-lg-12 col-xs-12 col-md-12">{{ item.description }}</td>
          <td><i :class="(item.value === 1) ? 'fa fa-check-square option' : 'fa fa-square option'" v-on:click="setValue()" aria-hidden="true"></i></td>
          <td><i class="fa fa-remove option" v-on:click="remove()" aria-hidden="true"></i></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'index', 'questionIndex', 'themeIndex', 'data', 'updateData'],
    data () {
      return {
      }
    },
    methods: {
      setValue: function () {
        if (this.item.value === 1) {
          this.item.value = 0

          /** now updating data */
          this.updateData()
        } else {
          this.item.value = 1

          /** now updating data */
          this.updateData()
        }
      },
      remove: function () {
        /** removing the reponse using its index */
        this.data[this.themeIndex].questions[this.questionIndex].reponses.splice(this.index, 1)

        /** now updating data */
        this.updateData()
      }
    }
  }
</script>

<style lang="scss" scoped>
/** Importing variables file */
@import '../../sass/variables.scss';


/** while the style of the answer's details this is mostly a copy-paste of the original answers, it differs a bit */

table {
  tr {
    td {
      vertical-align: middle;
      text-align: justify;
      padding-left: 5px;
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

  .question {
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
  }

  .valid {
    background: $question-reponse-label-valid-background;
    text-shadow: $question-text-shadow;
  }

  .not-valid {
    background: $question-reponse-label-not-valid-background;
    text-shadow: $question-text-shadow;
  }

  .option {
    padding: 0;
    margin: 0;
    font-size: $question-reponse-square-size;
    transition: $transition;

    &:hover {
      cursor: pointer;
      color: $color2;
    }
  }
}
</style>
