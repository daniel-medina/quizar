<template>
  <div>
    Liste des questions :
    <br /><br />
    <li v-for="(item, key) in localDb">
      <strong>{{ item.intitule }} ( sur {{ item.point }} points )</strong> - <button v-on:click="deleteQuestion(key)">X</button>
      <hr />
      <reponses :parent="key"></reponses>
      <br />
    </li>

    <br />
    <hr />
    <form method="post" v-on:submit="addQuestion"><input type="text" v-model="form.intitule" placeholder="Intitulé de la question" /> <input type="number" step="any" v-model="form.points" name="points" placeholder="Points à gagner" />
      <div v-if="form.image.length === 0">
        <button v-on:click="setImage">Définir l'illustration</button>
      </div>
      <div v-else>
        Illustration choisie : {{ form.image[0] }}
      </div>
      <input type="submit" value="Ajouter" /></form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        localDb: {},
        form: {
          intitule: '',
          points: '',
          image: ''
        }
      }
    },
    components: {
      reponses: require('./Question/Manage')
    },
    created: function () {
      this.setLocalDb()
    },
    methods: {
      setLocalDb: function () {
        const fs = require('fs')

        fs.readFile('db.json', 'utf8', function (error, data) {
          if (error) throw error

          this.localDb = JSON.parse(data)
        }.bind(this))
      },
      addQuestion: function (form) {
        form.preventDefault()
        const fs = require('fs')

        var intitule = this.form.intitule
        var points = this.form.points
        var image = ''

        /** first we move the image, if it exist, in the el folder; also generate random tokens */
        if (this.form.image.length > 0) {
          var token = Math.round(Math.random() * (9999999 - 1) + 1)
          var token2 = Math.round(Math.random() * (9999 - 1) + 1)
          var additionnal = 'app/dist/'
          var destination = token + '/' + token2 + '.png'
          var source = this.form.image[0]

          /** now copying the image to the desination; prefered synchronous version instead of asynchronous */
          fs.mkdirSync('app/dist/' + token)
          fs.createReadStream(source).pipe(fs.createWriteStream(additionnal + destination))

          /** final attribution of the image */
          image = destination
        } else {
          image = ''
        }

        var toAdd = {
          intitule: intitule,
          point: points,
          image: image,
          reponse: []
        }

        this.localDb.push(toAdd)
        this.updateDb()
      },
      deleteQuestion: function (key) {
        console.log('delete order requested')
        this.localDb.splice(key, 1)

        /** now calling updateDb to send the modifications to the json file */
        this.updateDb()
      },
      setImage: function (e) {
        e.preventDefault()

        const {dialog} = require('electron').remote
        dialog.showOpenDialog({
          filters: [
            { name: 'Images', extensions: ['jpg', 'png', 'gif', 'bmp', 'jpeg'] }
          ],
          properties: ['openFile']
        }, function (file) {
          if (file !== undefined) {
            this.form.image = file
          }
        }.bind(this))
      },
      updateDb: function () {
        const fs = require('fs')

        /** update db.json with the current localDb object */
        fs.writeFile('db.json', JSON.stringify(this.localDb), 'utf8', function (error) {
          if (error) throw error

          console.log('JSON database saved successfully.')

          /** now we re-update this.localDb with the new infos */
          this.setLocalDb()
        }.bind(this))
      }
    }
  }
</script>

<style scoped>

</style>
