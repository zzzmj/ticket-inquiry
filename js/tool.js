// 计算日期前一天
var getPreDay = function(curDate) {
    var cur = Date.parse(curDate)
    cur -= 1000*60*60*24
    var PreDay = new Date(cur)

    var year = PreDay.getFullYear()
    var month = PreDay.getMonth()+1
    var day = PreDay.getDate()
    return `${frontZero(year)}-${frontZero(month)}-${frontZero(day)}`
}
// 计算日期后一天
var getNextDay = function(curDate) {
    var cur = Date.parse(curDate)
    cur += 1000*60*60*24
    var nextDay = new Date(cur)

    var year = nextDay.getFullYear()
    var month = nextDay.getMonth()+1
    var day = nextDay.getDate()
    return `${frontZero(year)}-${frontZero(month)}-${frontZero(day)}`
}
// 得到当前日期
var getTime = function() {
    var d = new Date()
    var year = d.getFullYear()
    var month = d.getMonth()+1
    var day = d.getDate()
    return `${frontZero(year)}-${frontZero(month)}-${frontZero(day)}`
}
// xxxx-xx-xx格式, 首位不足则添0
var frontZero = function(d) {
    if (d < 10) {
        return '0' + d
    }
    return d
}