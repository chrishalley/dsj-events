export default function(context) {
  if (process.client) {
    const body = document.querySelector('body')
    body.classList.remove('noScroll')
  }
}