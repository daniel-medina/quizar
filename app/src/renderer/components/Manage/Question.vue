<template>
  <div>
    <li v-for="(item, index) in data">
      <h4><button v-on:click="deleteQuestion(index)">X</button> Question : {{ item.intitule }}</h4>
      <hr />
      <reponses :data="item.reponses" :questionIndex="index" :themeIndex="themeIndex"></reponses>
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
      <input type="submit" value="Ajouter" />
    </form>
  </div>
</template>

<script>
  export default {
    props: ['data', 'themeIndex'],
    components: {
      reponses: require('./Reponse')
    },
    data () {
      return {
        form: {
          intitule: '',
          points: '',
          image: ''
        }
      }
    },
    methods: {
      addQuestion: function (form) {
        form.preventDefault()
        const fs = require('fs')

        var intitule = this.form.intitule
        var points = this.form.points
        var image = ''

        /** first we move the image, if it exist, in the el folder; also generate random tokens */
        if (this.form.image.length > 0) {
          var token = Math.round(Math.random() * (9999999 - 1) + 1)
          var token2 = Math.round(Math.random() * (9999999 - 1) + 1)
          var additionnal = 'data/'
          var destination = token + '/' + token2 + '.png'
          var source = this.form.image[0]

          /** just in case the database has been wiped out, we make the image folder */
          if (!fs.existsSync('data')) {
            fs.mkdirSync('data')
          }
          /** now copying the image to the destination; prefered synchronous version instead of asynchronous */
          fs.mkdirSync('data/' + token)
          fs.createReadStream(source).pipe(fs.createWriteStream(additionnal + destination))

          /** final attribution of the image */
          image = destination
        } else {
          image = ''
        }

        var toAdd = {
          intitule: intitule,
          points: points,
          image: image,
          reponses: []
        }

        this.$parent.data[this.themeIndex].questions.push(toAdd)

        /** now updating the datas */
        this.$parent.updateData()

        /** resetting the current form values */
        this.form.intitule = ''
        this.form.points = ''
        this.form.image = ''
      },
      deleteQuestion: function (index) {
        this.$parent.data[this.themeIndex].questions.splice(index, 1)

        /** now updating the datas */
        this.$parent.updateData()
      },
      setImage: function (e) {
        e.preventDefault()

        const { dialog } = require('electron').remote

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
      }
    }
  }
</script>

<style>

</style>
