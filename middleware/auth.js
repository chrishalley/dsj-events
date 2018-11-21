export default function(context) {
  console.log('[middleware] auth.js')
  if (!context.store.getters.isUserAuthenticated) {
    context.redirect('/login/')
  }
}
