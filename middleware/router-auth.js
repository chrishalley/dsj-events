// export default function({store, redirect, route}) { // Route guards
//     store.state.currentUser != null && route.name == 'login' ? redirect('/dashboard') : ''
//     store.state.currentUser == null && isAdminRoute(route) ? redirect('/login') : ''
// }

// function isAdminRoute(route) {
//     console.log('is Admin Route')
//     if (route.matched.some(record => {
//             return record.path.includes('/dashboard')
//         })) {
//         return true
//     }
// }