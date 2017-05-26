<template>
  <div>
    <li v-for="(item, key) in data">
      <span v-if="$parent.displayNote === 1">
        <span style="color: green;" v-if="item.value == 1">
          <span v-if="isChecked(key)">
            coché &nbsp;
          </span>
          <span v-else>
            non coché &nbsp;
          </span>
        </span>
        <span style="color: red;" v-else>
          <span v-if="isChecked(key)">
            coché &nbsp;
          </span>
          <span v-else>
            non coché &nbsp;
          </span>
        </span>
      </span>
      <span v-else>
        <input type="checkbox" v-model="checked" v-bind:value="key"></input>
      </span>

      {{ item.description }}
    </li>
  </div>
</template>

<script>
  export default {
    props: ['data'],
    data () {
      return {
        edit: 0,
        checked: [],
        given: 0
      }
    },
    created () {
    },
    methods: {
      isChecked: function (key) {
        if (this.checked.includes(key)) {
          return true
        }
      }
    }
  }
</script>

<style scoped>
</style>
