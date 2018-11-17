export default async function(context) {
  console.log('[middleware] checkAuth.js')
    await context.store.dispatch('initAuth', context.req)
}
