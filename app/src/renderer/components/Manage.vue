<template>
  <div>
    <div class="wrapper">
      <div class="col-md-12 col-xs-12 col-sm-12 col-lg-12" v-for="(item, index) in data">
        <themes :item="item" :index="index"></themes>
      </div>
    </div>
    <form method="post" v-on:submit="addTheme"><input type="text" v-model="form.theme" placeholder="Intitulé de la thématique" />
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
    created () {
      this.getData()
    },
    components: {
      themes: require('./Manage/Theme')
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
      }
    }
  }
</script>

<style lang="scss" scoped>
/** Importing variables file */
@import '../sass/variables.scss';

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 100%;
  width: 100%;
  padding: 10px;
}
</style>
