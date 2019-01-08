import axios from '@nuxtjs/axios'

export function tokenFromCookie (token, cookie) {
  return (cookie.split(';'))
  .map(record => record.trim().split('='))
  .map(record => {
    return {
      name: record[0],
      value: record[1]
    } 
  })
  .find((record) => {
    return record.name === token
  })
}

export function setAuthToken (token) {
  axios.defaults.headers.common['Authorization'] = token
}
export function resetAuthToken () {
  delete axios.defaults.headers.common['Authorization']
}