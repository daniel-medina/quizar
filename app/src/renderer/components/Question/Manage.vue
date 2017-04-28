<template>
  <div>
    <li v-for="(item, key) in localDb">
      - {{ item.description }} <button v-on:click="deleteReponse(key)">X</button>
    </li>
    <br />
    <form method="post" v-on:submit="addReponse"><input type="text" v-model="form.description" name="description" placeholder="Texte de la réponse" /> - <input type="checkbox" name="value" v-model="form.value" v-bind:true-value="1" v-bind:false-value="0" /> bonne réponse <input type="submit" value="Ajouter" /></form>
  </div>
</template>

<script>
  export default {
    props: ['parent'],
    data () {
      return {
        localDb: [],
        form: {
          description: '',
          value: 0
        }
      }
    },
    created () {
      this.setLocalDb()
    },
    methods: {
      setLocalDb: function () {
        const fs = require('fs')

        fs.readFile('data/db.json', 'utf8', function (error, data) {
          if (error) throw error

          this.localDb = JSON.parse(data)[this.parent].reponse
        }.bind(this))
      },
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
          this.$parent.$parent.jsonAddReponse(this.parent, added)

          /** now re-updating this.localDb for reactive display */
          this.setLocalDb()

          /** now reset the current form values */
          this.form.description = ''
          this.form.value = 0
        }
      },
      deleteReponse: function (index) {
        this.$parent.$parent.jsonDeleteReponse(this.parent, index)
        console.log(index)
        this.setLocalDb()
      }
    }
}
</script>

<style scoped>

</style>
