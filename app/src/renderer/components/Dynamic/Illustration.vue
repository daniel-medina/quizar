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
    <div id="illustration">
      <img v-on:click="modal()" :src="image" />
      <div class="modal" :style="style">
        <img v-on:click="modal()" :src="image" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['image'],
    data () {
      return {
        style: {
          visibility: 'hidden',
          opacity: '0'
        }
      }
    },
    methods: {
      modal: function () {
        this.display = !this.display

        if (!this.display) {
          this.style = {
            visibility: 'visible',
            opacity: '1'
          }
        } else {
          this.style = {
            visibility: 'hidden',
            opacity: '0'
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
/** Importing variables file */
@import '../../sass/variables.scss';

#illustration {
  text-align: center;

  img {
    margin: $question-illustration-margin;

    max-height: $question-illustration-height;
    max-width: $question-illustration-width;

    border: $question-illustration-border;
    border-radius: $question-illustration-border-radius;

    transition: $transition;

    &:hover {
      cursor: pointer;
      border: $question-illustration-border-hover;
    }
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    z-index: 2;

    background: $modal-background;
    transition: $transition;

    height: 100%;
    width: 100%; 

    img {
      max-height: $question-illustration-modal-height;
      max-width: $question-illustration-modal-width;
      border: 0;
      border-radius: 1px;
    }
  }
}
</style>
