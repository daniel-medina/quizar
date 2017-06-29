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
