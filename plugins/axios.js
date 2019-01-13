export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    const token = store.getters.getAuthToken
    if (!token) {
      return
    }
    config.headers.common['Authorization'] = 'Bearer ' + token
  })
}