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
            multiple
            v-if="!uploading"
            v-model="file"
            label="Select File"
          ></v-file-input>
  <v-progress-linear
      height="25"
      v-model="progress"
      color="white"
      v-else
    >
      <strong>This is just me%</strong>
    </v-progress-linear>
        </v-card-text>
        <v-card-actions class="">
          <v-spacer/>
          <v-btn
            color="primary"
            nuxt
            :disabled=" uploading || !file"

            @click="handleUpload"
          >
            Load File
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

export default {
  data: ()=> ({
    loaded: false,
    uploading: false,
    completed: false,
    file: null
  }),
  components: {
    Logo,
    VuetifyLogo
  },

  methods: {
    async handleUpload() {
      const formData = new FormData();

      formData.append('image', this.file)
     

      try {
        this.uploading = true


        let axiosConfig = {
          onUploadProgress: e =>  this.progress = Math.round(e.loaded * 100 / e.total)
        };

        const {data} = await this.$axios.post('/files', formData, axiosConfig)


        this.uploading = false;
        this.completed = true;
      }catch(error) {

      }

  }
  }
}
</script>
