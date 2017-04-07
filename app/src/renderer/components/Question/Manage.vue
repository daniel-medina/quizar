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

        fs.readFile('db.json', 'utf8', function (error, data) {
          if (error) throw error

          this.localDb = JSON.parse(data)[this.parent].reponse
        }.bind(this))
      },
      addReponse: function (form) {
        form.preventDefault()

        const fs = require('fs')
        var description = this.form.description
        var value = this.form.value
        var added = {
          value: value,
          description: description
        }

        /** the description must be more than one character long */
        if (description.length > 0) {
          /** update the db.json with the new answer */
          fs.readFile('db.json', 'utf8', function (error, data) {
            if (error) throw error

            var actual = JSON.parse(data)
            actual[this.parent].reponse.push(added)

            fs.writeFile('db.json', JSON.stringify(actual), function (error) {
              if (error) throw error

              /** now re-updating this.localDb for reactive display */
              this.setLocalDb()

              /** now reset the current form values */
              this.form.description = ''
              this.form.value = 0
            }.bind(this))
          }.bind(this))
        }
      },
      deleteReponse: function (key) {
        const fs = require('fs')

        fs.readFile('db.json', 'utf8', function (error, data) {
          if (error) throw error

          this.localDb.splice(key, 1)

          this.updateDb(key)
        }.bind(this))
      },
      updateDb: function (key) {
        const fs = require('fs')

        fs.readFile('db.json', 'utf8', function (error, data) {
          if (error) throw error

          /** getting the db.json content and then deleting the selected answer */
          var updated = JSON.parse(data)
          updated[this.parent].reponse.splice(key, 1)

          /** then we send the updated object to the json database */
          fs.writeFile('db.json', JSON.stringify(updated), 'utf8', function (error) {
            if (error) throw error

            console.log('JSON database saved successfully.')

            /** now re-updating this.localDb for reactive display */
            this.setLocalDb()
          }.bind(this))
        }.bind(this))
      }
    }
}
</script>

<style scoped>

</style>
