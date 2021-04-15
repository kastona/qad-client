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
  
      let endpoint = 'https://qad.herokuapp.com/files'
      if(arg.readText) {
        endpoint = 'https://qad.herokuapp.com/read'
      }
      
      const res = await this.$axios.$post(endpoint, arg.file, axiosConfig)
  
      return res
    }
  }