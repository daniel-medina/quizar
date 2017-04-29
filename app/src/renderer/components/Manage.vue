<template>
  <div>
    <h1>Thématiques</h1>
    <hr />
    <br /><br />
    <li v-for="(item, index) in data">
      <h2> {{ item.theme }} </h2>
      <hr />
      <br />
      <questions :data="item.questions" :themeIndex="index"></questions>
    </li>
    <br />
    <hr />
    <form method="post" v-on:submit="addTheme"><input type="text" v-model="form.theme" placeholder="Thèmatique de question" />
      <input type="submit" value="Ajouter" />
    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        data: [],
        form: {
          theme: ''
        }
      }
    },
    components: {
      questions: require('./Manage/Question')
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData: function () {
        const fs = require('fs')
        var data = JSON.parse(fs.readFileSync('data/db.json', 'utf8'))

        this.data = data
      },
      updateData: function () {
        const fs = require('fs')

        /** update db.json with the current localDb object */
        fs.writeFile('data/db.json', JSON.stringify(this.data), 'utf8', function (error) {
          if (error) throw error

          /** now we update this.getData() */
          this.getData()
        }.bind(this))
      },
      addTheme: function (form) {
        form.preventDefault()

        var theme = this.form.theme
        var toAdd = {
          theme: theme,
          questions: []
        }

        this.data.push(toAdd)

        /** now updating the datas */
        this.updateData()

        /** resetting the current form value */
        this.form.theme = ''
      }
    }
  }
</script>

<style scoped>

</style>
