<<<<<<< HEAD
export default async function(context) {
  console.log('[middleware] checkAuth.js')
    await context.store.dispatch('initAuth', context.req)
=======
export default function(context) {
  console.log('[middleware] checkAuth.js')
    context.store.dispatch('initAuth', context.req)
>>>>>>> af947747d0c74314b6292d20c0f5282a228dd253
}
