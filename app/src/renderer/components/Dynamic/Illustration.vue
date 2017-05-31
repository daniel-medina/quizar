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
