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
            <div class="col-3">
                <p class="detail-item-start">${ticket.start_time}</p>
                <p class="detail-item-from">${ticket.from}</p>
                <p class="detail-item-one detail-item-seat">${key[0]}${value[0]}</p>
            </div>
            <div class="col-3 text-center">
                <p class="detail-item-spend">${ticket.spend}</p>
                <div class="detail-item-img">
                    <i></i>
                    <span class="align-self-center"></span>
                    <i></i>
                </div>
                <p class="detail-item-mid detail-item-seat">${key[1]}${value[1]}</p>
            </div>
            <div class="col-3 text-right">
                <p class="detail-item-end">${ticket.end_time}</p>
                <p class="detail-item-to">${ticket.to}</p>
                <p class="detail-item-three detail-item-seat">${key[2]}${value[2]}</p>
            </div>
            <div class="col-3 text-right">
                <p class="detail-item-air-money"><span>￥${ticket.price}</span><i>起</i></p>
            </div>

            <div class="row text-left">
                <p class="detail-item-num">${ticket.train_num}</p>
            </div>

        </div>
    `
    console.log('模板', t);
    return t
}

var getVaildCity = function(city, port) {
    if (port == null) {
        return city
    } else {
        return city + port
    }
}

var getTicket = function(r, ticket) {
    var depTime = r.dep_time
    var arrTime = r.arr_time
    var train_num = r.com + r.flight_num + r.plain_type
    var from = getVaildCity(r.port.dep_city, r.port.dep_port)
    var to = getVaildCity(r.port.arr_city, r.port.arr_port)

    var o = {
        from: from,
        to: to,
        goDate: ticket.goDate,
        train_num: train_num,
        start_time: depTime,
        end_time: arrTime,
        spend: r.spend,
        price: r.price
    }
    console.log('ticket: ', o);
    return o
}