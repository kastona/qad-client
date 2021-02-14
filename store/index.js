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
  
   
    async uploadFile(vuexContext, file) {
      let axiosConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: e => vuexContext.commit('setUploadProgress', Math.round(e.loaded * 100 / e.total)),
        responseType: 'blob'
        
      }
  
      
      const res = await this.$axios.$post('/files', file, axiosConfig)
  
      return res
    }
  }