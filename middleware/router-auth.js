export default function({store, redirect, route}) { // Route guards
    // store.state.currentUser != null && route.name == 'login' ? redirect('/dashboard') : ''
<<<<<<< HEAD
    // store.state.currentUser == null && isAdminRoute(route) ? redirect('/login') : ''
=======
    store.state.currentUser == null && isAdminRoute(route) ? redirect('/login') : ''
>>>>>>> af947747d0c74314b6292d20c0f5282a228dd253
}

function isAdminRoute(route) {
    if (route.matched.some(record => {
            return record.path.includes('/dashboard')
        })) {
        return true
    }
}