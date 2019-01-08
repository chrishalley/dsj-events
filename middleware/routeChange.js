export default function(context) {
  if (process.client) {
    console.log('routeChange MW client')
    const body = document.querySelector('body')
    body.classList.remove('noScroll')
  } else {
    console.log('routeChange MW server')
  }
}