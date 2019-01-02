var template = function(ticket, seat, second) {
    /**
     * 模板字符串
     * @param {object} ticket 车票对象
     * @param {object} seat 座位对象
     * @param {object} second 第二次ajax请求数据对象
     */
    var key = ['', '', '', '']
    var value = ['', '', '', '']
    var i = 0
    for (let item in seat) {
        key[i] = item + ':'
        if (seat[item] == '有' || seat[item] == '无') {
            value[i] = seat[item] + '票'
        } else {
            value[i] = seat[item] + '张'
        }
        i++;
    }

    var t = `
        <div class="row detail-item">
            <div class="col-3 text-left item">
                <p class="text-left detail-item-start">${ticket.start_time}</p>
            </div>
            <div class="col-1 detail-item-img item ">
                <i class="align-self-center"></i>
                <span class="align-self-center"></span>
                <i class="align-self-center"></i>
            </div>
            <div class="col-5 text-left item">

                <p class="detail-item-from">${ticket.from}</p>
                <p class="detail-item-to">${ticket.to}</p>

            </div>
            <div class="col-3 text-right item">
                <p class="detail-item-air-money"><span>￥${ticket.price}</span></p>
            </div>
        </div>
    `
    return t
}


var getTicket = function(r, ticket) {
    var o = {
        from: r.from_station,
        to: r.to_station,
        goDate: ticket.goDate,
        start_time: r.dep_time,
        price: r.price
    }
    return o
}