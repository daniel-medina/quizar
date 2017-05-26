<template>
  <div>
    <li v-for="(item, index) in data">
      <span style="color: green;" v-if="item.value === 1">
        {{ item.description }} <button v-on:click="deleteReponse(index)">X</button>
      </span>
      <span style="color: red;" v-else>
        {{ item.description }} <button v-on:click="deleteReponse(index)">X</button>
      </span>
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
          var db = this.$parent.$parent.data

          /** adding the reponse inside the question using the question's given index */
          db[this.themeIndex].questions[this.questionIndex].reponses.push(added)

          /** now updating the datas */
          this.$parent.$parent.updateData()

          /** resetting the current form values */
          this.form.description = ''
          this.form.value = 0
        }
      },
      deleteReponse: function (index) {
        var db = this.$parent.$parent.data

        /** removing the reponse using its index */
        db[this.themeIndex].questions[this.questionIndex].reponses.splice(index, 1)

        /** now updating the datas */
        this.$parent.$parent.updateData()
      }
    }
}
</script>

<style scoped>

</style>
