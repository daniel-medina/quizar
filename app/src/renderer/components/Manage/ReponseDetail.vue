<template>
  <span style="color: green;" v-if="item.value === 1">
    {{ item.description }} <button v-on:click="deleteReponse()">X</button>
  </span>
  <span style="color: red;" v-else>
    {{ item.description }} <button v-on:click="deleteReponse()">X</button>
  </span>
</template>

<script>
  export default {
    props: ['item', 'index', 'questionIndex', 'themeIndex'],
    data () {
      return {
      }
    },
    methods: {
      deleteReponse: function () {
        var db = this.$parent.$parent.$parent.$parent.$parent.data

        /** removing the reponse using its index */
        db[this.themeIndex].questions[this.questionIndex].reponses.splice(this.index, 1)

        /** now updating the datas */
        this.$parent.$parent.$parent.$parent.$parent.updateData()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
