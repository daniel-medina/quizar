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
