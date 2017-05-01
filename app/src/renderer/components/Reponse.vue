<template>
  <div>
    <li v-for="(item, key) in data">
      <input type="checkbox" v-model="checked" v-bind:value="key"></input> {{ item.description }}
    </li>
  </div>
</template>

<script>
  export default {
    props: ['data'],
    data () {
      return {
        checked: [],
        given: 0
      }
    },
    created () {
    },
    methods: {
    }
}
</script>

<style scoped>
</style>
