export default function(context) {
  console.log('[middleware] just Auth')
  if (!context.store.getters.isUserAuthenticated) {
    context.redirect('/login/')
  }
}
