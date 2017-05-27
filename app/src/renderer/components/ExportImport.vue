<template>
  <div>
    <h4>Ici vous pouvez exporter la base de donnée ainsi que les images dans une archive .zar. <br />
      Cette archive peut ensuite être importée et remplacera l'intégralité des données du programme.<br />
    Seule les archives exportées depuis ce programme pourront être importées.</h4>
    <hr />
    <button v-on:click="exportPrompt">Exporter</button>
    <button v-on:click="importPrompt">Importer</button>
    <button v-on:click="reset">Réinitialiser</button>
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
            /** if the user selected 'Oui', we delete all the images and set the database to '[]' */
            fs.removeSync('app/dist/db')
            fs.mkdirSync('app/dist/db')
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
        const archiver = require('archiver')
        const fs = require('fs-extra')

        let output = fs.createWriteStream(location)
        let archive = archiver('zip', {
          store: true
        })
        let uid = this.uid

        archive.append(uid, { name: '.token' })
        archive.directory('app/dist/db')
        archive.finalize()
        archive.pipe(output)

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

<style scoped>

</style>
