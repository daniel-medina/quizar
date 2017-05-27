<template>
  <div id="#app" class="container-fluid row">
    <router-view></router-view>

    <div class="footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="pull-left">
        <div class="app-name">quizzar</div>
      </div>

      <div class="pull-right">
        <div class="menu">
          <li>
            <router-link to="/"><i class="fa fa-book" aria-hidden="true"></i></router-link>
          </li>
          <li>
            <router-link to="/manage"><i class="fa fa-database" aria-hidden="true"></i></router-link>
          </li>
          <li>
            <router-link to="/export-import"><i class="fa fa-share-alt" aria-hidden="true"></i></router-link>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from 'renderer/vuex/store'

  export default {
    data () {
      return {
        dbLocation: 'db.json'
      }
    },
    store,
    created () {
      if (!this.dbExist()) {
        /** if the database couldn't be found, create it */
        var empty = JSON.stringify([])

        this.writeDb(empty)
      }
    },
    methods: {
      /** Global methods */
      getData: function () {
        const fs = require('fs')
        var db = fs.readFileSync(this.dbLocation, 'utf8')

        return JSON.parse(db)
      },
      writeDb: function (write) {
        const fs = require('fs-extra')

        if (!fs.existsSync('data')) {
          fs.mkdirSync('data')
        }

        fs.writeFileSync(this.dbLocation, write, 'utf8')
      },
      dbExist: function () {
        const fs = require('fs')

        return fs.existsSync(this.dbLocation)
      },
      escape: function (string) {
        var escape = document.createElement('textarea')
        escape.textContent = string

        return escape.innerHTML
      },
      nl2br: function (str, isXhtml) {
        var breakTag = (isXhtml || typeof isXhtml === 'undefined') ? '<br />' : '<br>'
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2')
      }
    }
  }
</script>

<style lang="scss">
$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
  @import "~bootstrap-sass/assets/stylesheets/_bootstrap.scss";

  /** Importing variables file */
  @import 'sass/variables.scss';

  /** webkit hacks */
  ::-webkit-scrollbar {
    display: none;
  }

  input::-webkit-outer-spin-button {
    width: 200px;
  }

  body {
    min-width: $min-width;
    font-family: $font-family;
  }

  .container-fluid {
    /** giving space for the footer */
    padding: $header-height 0 ($footer-height + 10px) 0;
  }

  .row {
    margin: 0;
  }

  li {
    list-style: none;
  }

  .disabled {
    &:hover {
      cursor: not-allowed;
    }
  }

  .btn {
    border-radius: $button-border-radius;
    border: $button-border;
    box-shadow: $button-shadow;

    text-transform: uppercase;
    font-weight: bold;
    font-size: $button-font-size;
    transition: $transition;
  }

  .btn-lg {
    padding: $button-lg-padding;
  }

  .btn-sm {
    padding: $button-sm-padding;
  }

  .btn-xs {
    padding: $button-xs-padding;
  }

  .bubble {
    float: left;
    position: relative;
    bottom: 40px;

    font-size: 14px;
    padding: 10px;

    background: orange;
    color: white;
    border-radius: 5px;
  }

  .block {
    padding: $block-padding;
    background: $block-background;
    border-radius: $block-border-radius;
    box-shadow: $block-shadow;

    color: $block-text-color;

    .form-control {
      border: none;
      border-radius: 2px;
      box-shadow: $button-shadow;
      transition: $transition;
      text-align: center;

      &:focus {
        box-shadow: $form-focus-shadow;
      }
    }
  }

  .block-alert {
    position: fixed;
    bottom: 50%;
    left: 50%;
    margin-left: $alert-margin-left;
    margin-bottom: $alert-margin-bottom;
    width: $alert-width;
    
    background: $block-alert-background;
    border-radius: $block-border-radius;
    box-shadow: $block-shadow;
    padding: $block-padding + 7px;

    color: $block-text-color;
    font-weight: bold;
    text-transform: uppercase;
  }

  .footer {
    position: fixed;
    bottom: 0;

    height: $footer-height;
    padding: $footer-padding;
    box-shadow: $footer-shadow;
    text-shadow: $menu-shadow;
    
    background: $footer-background;

    .menu {
      float: right;

      li {
        list-style: none;
        display: inline;

        padding: $footer-menu-button-padding;
        font-size: $footer-menu-button-font-size;

        a {
          color: $footer-menu-button-color;
          transition: $transition;

          &:hover {
            color: $footer-menu-button-color-current;
          }
        }

        .router-link-exact-active {
          color: $footer-menu-button-color-current;
        }
      }
    }

    .app-name {
      font-weight: $app-font-weight;
      font-size: $app-font-size;
      color: $app-font-color;

      text-transform: uppercase;
    }
  }
</style>
