export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    const currentUser = store.state.currentUser
    if (!currentUser) {
      return
    }
    const token = currentUser.tokens.find(cur => {
      return cur.access === 'super-admin' || cur.access === 'admin'
    })
    config.headers.common['Authorization'] = 'Bearer ' + token.token
  })
}