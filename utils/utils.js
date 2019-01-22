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

const timeStringFromISO = function(ISOString) {
  return ISOString.split('T')[1].slice(0,8)
}

const dateStringFromISO = function(ISOString) {
  return ISOString.split('T')[0].slice(0,10)
}

export default {
  tokenFromCookie,
  timeStringFromISO,
  dateStringFromISO
}