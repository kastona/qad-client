<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-alert
      dense
      outlined
      type="error"
      v-if="$nuxt.isOffline"
    >
      You are offline! Check your internet connection.
    </v-alert>
      <div class="text-center">
        <logo />
      </div>
      <v-card>
        <v-card-title class="headline ">
          <v-switch
      v-model="readText"
      
    ></v-switch>
          <span v-if="readText">Extract Text From Images</span>
          <span v-else>Convert Printed Tables to Excel Worksheets.</span>
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
          >
          <span >All done! You can now download your file!</span>
          </v-alert>

  <v-progress-linear
      height="25"
      v-model="uploadProgress"
      :indeterminate="uploadProgress >=100"
      color="success"
      v-if="uploading"
    >
      <strong v-if="uploadProgress >=100">Please wait....</strong>
      <strong v-else>{{uploadProgress}} %</strong>
    </v-progress-linear>
        </v-card-text>

        <v-card-actions  class="">
          <v-spacer/>
          <v-btn
            color="primary"
            nuxt
            :disabled=" uploading || !file"
            v-if="!completed "

            @click="handleUpload"
          >
            Load File
          </v-btn>
          <v-btn v-if="completed" color="info" @click="downloadFile">
            <v-icon
        right
        dark
      >
        mdi-download
      </v-icon>
            Download
        </v-btn>
        


     


        <v-btn v-if="downloaded" color="info" @click="$router.go(0)">
            <v-icon
        right
        dark
      >
        mdi-refresh
      </v-icon>
            Refresh App
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
import copy from 'copy-to-clipboard';

export default {
  data: ()=> ({
    loaded: false,
    uploading: false,
    completed: false,
    file: null,
    result: null,
    filename:null,
    downloaded: false,
    readText: false,
    showTextField: false
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
        this.result = await this.uploadFile({file: formData, readText: this.readText}); //this.$axios.post('/files', formData, axiosConfig)

        this.uploading = false;
        this.completed = true;
      }catch(error) {

          console.log(error.message)
      }

  },

  downloadFile() {

    this.downloaded = true;
    let name = this.filename? this.filename: 'converted file'



    
      FileUpload(this.result, `${name + this.readText? '.txt': '.xlsx'}`)
  

  },

  copyText() {
    this.downloaded = true;
    copy(this.myResult)
  }


  },
  computed: {
      ...mapGetters({
        uploadProgress: 'getUploadProgress'
      }),

      myResult() {
        if(this.readText && this.result) {
          return this.result[0]
          
        }else {
          return ''
        }
      }
    }
}
</script>
