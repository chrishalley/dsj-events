import Vue from 'vue'

Vue.filter('unixToDate', val => {
    let date, day, month, year, days, months, dateNumber
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    date = new Date(val)
    day = date.getDay()
    dateNumber = date.getDate()
    month = date.getMonth()
    year = date.getFullYear()
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    return `${days[day]}, ${appendDateNumber(dateNumber)} ${months[month]} ${year}`
})

Vue.filter('unixToTime', val => {
    let time, hours, minutes, suffix
    time = new Date(val)
    hours = time.getHours() < 13 ? time.getHours() : time.getHours() - 12
    suffix = time.getHours() > 11 ? 'pm' : 'am'
    minutes = time.getMinutes() > 9 ? time.getMinutes() : `0${time.getMinutes()}`
    return `${hours}:${minutes}${suffix}`
})

export function appendDateNumber(date) {
    let lastDigit, suffix
    lastDigit = date.toString().slice(-1)
    if ([11,12,13].indexOf(date) === -1) {
        switch(lastDigit) {
            case '1':
                suffix = 'st'
                break
            case '2':
                suffix = 'nd'
                break
            case '3':
                suffix = 'rd'
                break
            default:
                suffix = 'th'
        }
    } else {
        suffix = 'th'
    }
    return `${date + suffix}`
}