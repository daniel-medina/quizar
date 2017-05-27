<template>
  <div class="form-group">
    <li v-for="(item, key) in data">
      <div class="checkbox col-md-6 col-xs-12 col-sm-6 col-lg-6">
        <!-- answer block -->
        <label v-if="$parent.displayNote === 0">
          <table>
            <tr>
              <td class="col-sm-12 col-lg-12 col-xs-12 col-md-12">{{ item.description }}</td>
              <td>
                <input v-if="$parent.validated === 0" type="checkbox" v-model="checked" v-bind:value="key"></input>
                <span v-if="isChecked(key)">
                  <i class="fa fa-check-square square" aria-hidden="true"></i>
                </span>
                <span v-else>
                  <i class="fa fa-square square" aria-hidden="true"></i>
                </span>
              </td>
            </tr>
          </table>
        </label>

        <!-- valid answer block -->
        <label class="valid" v-if="$parent.displayNote === 1 && item.value === 1">
          <table>
            <tr>
              <td class="col-sm-12 col-lg-12 col-xs-12 col-md-12">{{ item.description }}</td>
              <td>
                <span v-if="isChecked(key)">
                  <i class="fa fa-check-square square" aria-hidden="true"></i>
                </span>
                <span v-else>
                  <i class="fa fa-square square" aria-hidden="true"></i>
                </span>
              </td>
            </tr>
          </table>
        </label>

        <!-- invalid answer block -->
        <label class="not-valid" v-if="$parent.displayNote === 1 && item.value === 0">
          <table>
            <tr>
              <td class="col-sm-12 col-lg-12 col-xs-12 col-md-12">{{ item.description }}</td>
              <td>
                <span v-if="isChecked(key)">
                  <i class="fa fa-check-square square" aria-hidden="true"></i>
                </span>
                <span v-else>
                  <i class="fa fa-square square" aria-hidden="true"></i>
                </span>
              </td>
            </tr>
          </table>
        </label>
      </div>
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

<style lang="scss" scoped>
$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
@import "~bootstrap-sass/assets/stylesheets/_bootstrap.scss";

/** Importing variables file */
@import '../sass/variables.scss';

table {
  tr {
    td {
      vertical-align: middle;
      text-align: justify;
    }
  }
}

.col-md-6 {
  padding: $question-reponse-col-padding;
}

.checkbox {
  margin: $question-reponse-checkbox-margin;

  input {
    visibility: hidden;
  }

  label {
    width: 100%;
    border-radius: $question-reponse-label-border-radius;
    background: $question-reponse-label-background;
    box-shadow: $question-reponse-label-shadow;

    padding: $question-reponse-label-padding;
    font-size: $question-reponse-label-font-size;
    font-weight: bold;
  }

  label.valid {
    background: $question-reponse-label-valid-background;
    box-shadow: $question-reponse-label-valid-shadow;
  }

  label.not-valid {
    background: $question-reponse-label-not-valid-background;
    box-shadow: $question-reponse-label-not-valid-shadow;
  }

  .square {
    padding: 0;
    margin: 0;
    font-size: $question-reponse-square-size;
  }
}
</style>
