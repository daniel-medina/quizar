/** This file is part of Quizzar.
 * Copyright (C) 2017 Daniel Medina
 *
 * Quizzar is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Quizzar is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Quizzar.  If not, see <http://www.gnu.org/licenses/>.
 */

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
