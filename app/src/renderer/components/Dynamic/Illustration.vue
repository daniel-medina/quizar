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
        display: false,
        style: {
          visibility: 'hidden',
          opacity: '0'
        }
      }
    },
    methods: {
      modal: function () {
        if (!this.display) {
          this.display = !this.display

          this.style = {
            visibility: 'visible',
            opacity: '1'
          }
        } else {
          this.display = !this.display

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
$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
@import "~bootstrap-sass/assets/stylesheets/_bootstrap.scss";

/** Importing variables file */
@import '../../sass/variables.scss';

#illustration {
  text-align: center;

  img {
    margin: $question-illustration-margin;

    max-height: $question-illustration-height;
    max-width: $question-illustration-width;

    border-radius: $question-illustration-border-radius;
    box-shadow: $question-illustration-shadow;

    transition: $transition;

    &:hover {
      cursor: pointer;
      box-shadow: $question-illustration-hover-shadow;
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

      &:hover {
        box-shadow: none;
      }
    }
  }
}
</style>
