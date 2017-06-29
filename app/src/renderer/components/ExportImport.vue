<template>
  <div>
    <div class="wrapper">
      <div class="block">
        <div class="col-md-12">
          <button class="btn btn-md btn-success" v-on:click="exportPrompt">Exporter</button>
          <button class="btn btn-md btn-warning" v-on:click="importPrompt">Importer</button>
          <div class="pull-right">
            <button class="btn btn-md btn-danger" v-on:click="reset">Réinitialiser</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        /** very important - used to allow importation of archive exported from this software ONLY */
        uid: '42'
      }
    },
    methods: {
      reset: function () {
        const { dialog } = require('electron').remote
        const fs = require('fs-extra')

        dialog.showMessageBox({ type: 'question', buttons: ['Non', 'Oui'], title: 'Réinitialiser la base de donnée', message: 'Êtes-vous sûr de vouloir réinitialiser la base de donnée ?' }, function (choice) {
          if (choice) {
            /** if the user selected 'Oui', we delete all the images */
            if (this.$parent.env !== 'development') {
              fs.removeSync('resources/app/dist/illustration')
              fs.mkdirSync('resources/app/dist/illustration')
              fs.removeSync('resources/app/.data')
            } else {
              fs.removeSync('app/dist/illustration')
              fs.mkdirSync('app/dist/illustration')
              fs.removeSync('.data')
            }

            /** we now reset the database */
            this.$parent.createEmpty()

            /** confirmation dialog */
            dialog.showMessageBox({ title: 'Confirmation', message: 'La base de donnée a bien été réinitialisée.', buttons: ['Ok'] })
          }
        }.bind(this))
      },
      exportPrompt: function () {
        const { dialog } = require('electron').remote

        dialog.showSaveDialog({ title: 'Exporter la base de donnée', filters: [{ name: 'Archive QUIZZAR', extensions: ['zar'] }] }, function (file) {
          if (file !== undefined) {
            /** when the exportation file is defined, we execute the export function */
            this.exportExecute(file)
          }
        }.bind(this))
      },
      exportExecute: function (location) {
        const { dialog } = require('electron').remote
        /** const fstream = require('fstream')
        const Tar = require('tar')
        const pack = new Tar.Pack()
        const zlib = require('zlib')
        const path = require('path')

        var illustration = path.join(process.cwd() + '/app/dist/illustration')
        var read = fstream.Reader({ 'path': illustration, 'type': 'Directory' })
            .pipe(pack)
            .pipe('/home/ifthenelse/')

        console.log(read) */

        /** const archiver = require('archiver')

        var output = fs.createWriteStream(location)
        var archive = archiver('zip', {
          store: true
        })
        var uid = this.uid

        archive.append(uid, { name: '.token' })
        archive.file(this.$parent.dbLocation, { name: '.data' })

        if (this.$parent.env !== 'development') {
          archive.directory('resources/app/dist/illustration')
        } else {
          archive.directory('app/dist/illustration')
        }

        archive.pipe(output)
        archive.finalize() */

        /** TROUVER UN ARCHIVEUR MOINS BUGGE QUE ADMZIP */
        var AdmZip = require('adm-zip')
        var zip = new AdmZip()
        var uid = this.uid
        zip.addLocalFolder('app/dist/illustration', 'app/dist/illustration')
        zip.addLocalFile(this.$root.dbLocation)
        zip.addFile('.token', uid)
        zip.writeZip(location)

        /** confirmation dialog */
        dialog.showMessageBox({ title: 'Confirmation', message: 'La base de donnée a bien été exportée.', buttons: ['Ok'] })
      },
      importPrompt: function () {
        const { dialog } = require('electron').remote

        /** ask the user if he's sure he wants to import, explaining the consequences; in french */
        dialog.showMessageBox({ type: 'question', title: 'Importer une base de donnée', message: 'Êtes-vous sûr de vouloir importer une base de donnée ? Cela remplacera TOUTES les données actuelles', buttons: ['Non', 'Oui'] }, function (choice) {
          /** choice 0 = Non ; choice 1 = Oui */
          if (choice) {
            /** dialog prompt for the database archive to import */
            dialog.showOpenDialog({ title: 'Importation d\'une base de donnée', filters: [{ name: 'Archive QUIZZAR', extensions: ['zar'] }], properties: ['openFile'] }, function (file) {
              if (file !== undefined) {
                this.importExecute(file)
              }
            }.bind(this))
          }
        }.bind(this))
      },
      importExecute: function (file) {
        const AdmZip = require('adm-zip')
        const { dialog } = require('electron').remote
        const fs = require('fs-extra')

        var archive = file[0]
        var zip = new AdmZip(archive)
        var check = zip.readAsText(zip.getEntry('.token'))

        if (check === this.uid) {
          /** we proceed the importation by wiping the database and it's images */
          fs.removeSync('app/dist/db')
          zip.extractAllTo('./', true)
          /** after the archive has been extracted, delete the .token */
          fs.removeSync('.token')
          /** confirmation dialog */
          dialog.showMessageBox({ title: 'Confirmation', message: 'La base de donnée a bien été importée.', buttons: ['Ok'] })
        } else {
          dialog.showMessageBox({ type: 'error', message: 'L\'archive selectionnée ne correspond pas à une base de donnée valide.', buttons: ['Ok'] })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
/** Importing variables file */
@import '../sass/variables.scss';

.wrapper {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 100%;
  width: 100%;
  padding-bottom: $footer-height;
}

.block {
  width: $choose-width;
  padding: $choose-padding-bottom - 5px;

  .title {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: $welcome-font-size;
    margin: $welcome-margin;
  }

  .form-control {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
