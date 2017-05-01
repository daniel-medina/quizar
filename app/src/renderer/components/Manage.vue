<template>
  <div>
    <h1>Thématiques</h1>
    <hr />
    <br /><br />
    <li v-for="(item, index) in data">
      <h2> {{ item.theme }} <button v-on:click="deleteTheme(index)">X</button></h2>
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
        var data = this.$parent.getData()

        this.data = data
      },
      updateData: function () {
        this.$parent.writeDb(JSON.stringify(this.data))
        this.getData()
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
      },
      deleteTheme: function (index) {
        this.data.splice(index, 1)

        /** now updating the datas */
        this.updateData()
      }
    }
  }
</script>

<style scoped>

</style>
