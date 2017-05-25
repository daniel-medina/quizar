<template>
  <div id="#app">
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
        dbLocation: 'data/db.json'
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

  /** removing the useless scrollbar */
  ::-webkit-scrollbar {
    display: none;
  }

  body {
    min-width: 480px;

    /** giving space for the footer */
    padding: 0 0 $footer-height + 10px 0;
  }

  li {
    list-style: none;
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

  .footer {
    position: fixed;
    bottom: 0;

    height: $footer-height;
    padding: $footer-padding;
    box-shadow: $footer-shadow;
    
    background: $footer-background;

    .menu {
      float: right;

      li {
        list-style: none;
        display: inline;

        padding: $menu-button-padding;
        font-size: $menu-button-font-size;

        a {
          color: $menu-button-color;
          transition: $transition;

          &:hover {
            color: $menu-button-color-current;
          }
        }

        .router-link-exact-active {
          color: $menu-button-color-current;
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
