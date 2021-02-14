<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
      </div>
      <v-card>
        <v-card-title class="headline ">
          Convert Printed Tables to Excel Worksheets.
        </v-card-title>
        <v-card-text >
          <v-file-input
            v-if="!uploading && !completed" 
            v-model="file"
            label="Select File"
          ></v-file-input>

          <v-text-field
            label="File Name"
            outlined
            v-model="filename"
          ></v-text-field>
          
          <v-alert
          v-if="completed"
             type="success"
          >All done! You can now download your file!</v-alert>

  <v-progress-linear
      height="25"
      v-model="uploadProgress"
      :indeterminate="uploadProgress >=100"
      color="white"
      v-if="uploading"
    >
      <strong>Please wait....</strong>
    </v-progress-linear>
        </v-card-text>
        <v-card-actions class="">
          <v-spacer/>
          <v-btn
            color="primary"
            nuxt
            :disabled=" uploading || !file"
            v-if="!completed"

            @click="handleUpload"
          >
            Load File
          </v-btn>
          <v-btn v-else color="info" @click="downloadFile">
            <v-icon
        right
        dark
      >
        mdi-download
      </v-icon>
            Download
        </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import {mapGetters, mapActions} from 'vuex'
import FileUpload from 'js-file-download'

export default {
  data: ()=> ({
    loaded: false,
    uploading: false,
    completed: false,
    file: null,
    result: null,
    filename:null
  }),
  components: {
    Logo,
    VuetifyLogo
  },

  methods: {
    ...mapActions({
        uploadFile: 'uploadFile'
      }),
    async handleUpload() {
      
      try {
        this.uploading = true

        const formData = new FormData();
        formData.append('file', this.file)
        formData.append('filename', this.filename)
        this.result = await this.uploadFile(formData); //this.$axios.post('/files', formData, axiosConfig)

      
      
      
      console.log(this.file)
        

        this.uploading = false;
        this.completed = true;
      }catch(error) {

          console.log(error.message)
      }

  },

  downloadFile() {

    let filename = this.filename? this.filename: 'converted file'
    FileUpload(this.result, `${this.filename}.xlsx`)
  }
  },
  computed: {
      ...mapGetters({
        uploadProgress: 'getUploadProgress'
      })
    }
}
</script>
