const tokenFromCookie = function(token, cookie) {
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

export default {
  tokenFromCookie
}