export const state = () => ({
    progress: 0,
  
  })
  
  
  export const getters = {
    
    getUploadProgress: (state) => {
      return state.progress
    }
  }
  
  export const mutations = {
    setUploadProgress(state, data) {
      state.progress = data
  
    }
  }
  
  
  export const actions = {
  
   
    async uploadFile(vuexContext, arg) {
      let axiosConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: e => vuexContext.commit('setUploadProgress', Math.round(e.loaded * 100 / e.total)),
        responseType: 'blob'
        
      }
  
      let endpoint = 'http://localhost:4000/files'
      if(arg.readText) {
        endpoint = 'http://localhost:4000/read'
      }
      
      const res = await this.$axios.$post(endpoint, arg.file, axiosConfig)
  
      return res
    }
  }