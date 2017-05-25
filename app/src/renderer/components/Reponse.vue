<template>
  <div>
    <li v-for="(item, key) in data">
      <div class="pull-left" v-if="$parent.validated == 1">
        <span style="color: green;" v-if="item.value == 1">
          <div v-if="isChecked(key)">
            coché &nbsp;
          </div>
          <div v-else>
            non coché &nbsp;
          </div>
        </span>
        <span style="color: red;" v-else>
          <div v-if="isChecked(key)">
            coché &nbsp;
          </div>
          <div v-else>
            non coché &nbsp;
          </div>
        </span>
      </div>
      <div v-else>
        {{ item.value }}
        <input type="checkbox" v-model="checked" v-bind:value="key"></input>
      </div>

      {{ item.description }}
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
