export default function(context) {
  console.log('[middleware] checkAuth')
    context.store.dispatch('initAuth', context.req)
}
