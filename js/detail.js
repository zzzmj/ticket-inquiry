var init = function() {
    let back = $('.datail-back')
    back.on('click', function() {        
        // 显示主页面, 并且把详情页的内容清空
        $('.container').hide()
        $('.container-header').show()
        $('.container-air').show()
        $('.air-ticket-background').show()
        $('.detail-body').empty()
    })
    let from = $('#id-from').val().trim()
    let to = $('#id-to').val().trim()
    let goDate = $('.detail-header-time').text().trim()
    let o = {
        from: from,
        to: to,
        goDate: goDate,
    }
    return o
}

var getTicket = function(r, ticket) {
    var o = {
        from: ticket.from,
        to: ticket.to,
        goDate: ticket.goDate,
        train_num: r.train_num,
        start_time: r.start_time,
        end_time: r.end_time,
        spend: r.spend,
    }

    return o
}

var getValidSeat = function(r) {
    let dict = {
        'A9': '商务座',
        'M': '一等座',
        'O': '二等座',
        'A6': '高等软卧',
        'A4': '软卧',
        'F': '动卧',
        'A3': '硬卧',
        'A2': '软座',
        'A1': '硬座',
        'WZ': '无座',
    }
    var seats = r.seats
    var o = {}
    for (let key in seats) {
        if (seats[key] != "" && seats[key].length > 0) {
            // 将座位的英文转为汉字
            o[dict[key]] = seats[key]
        }
    }
    
    return o;
}

var getSecondGetObject = function(r) {
    let date = $('.detail-header-time').text().trim()
    let o = {
        train_no: r.train_no,
        from_no: r.from_no,
        to_no: r.to_no,
        seat_type: r.seat_type,
        date: date,
    }
    return o
}

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
        <div class="row detail-item" data-train_no="${second.train_no}" 
        data-from_no="${second.from_no}" data-to_no="${second.to_no}" data-seat_type="${second.seat_type}" data-date="${second.date}">
            <div class="col-4">
                <p class="detail-item-start">${ticket.start_time}</p>
                <p class="detail-item-from">${ticket.from}</p>
                <p class="detail-item-one detail-item-seat">${key[0]}${value[0]}</p>
            </div>
            <div class="col-4 text-center">
                <p class="detail-item-spend">${ticket.spend}</p>
                <div class="detail-item-img">
                    <i></i>
                    <span class="align-self-center"></span>
                    <i></i>
                </div>
                <p class="detail-item-num">${ticket.train_num}</p>
                <p class="detail-item-mid detail-item-seat">${key[1]}${value[1]}</p>
            </div>
            <div class="col-4 text-right">
                <p class="detail-item-end">${ticket.end_time}</p>
                <p class="detail-item-to">${ticket.to}</p>
                <p class="detail-item-three detail-item-seat">${key[2]}${value[2]}</p>
            </div>

            <div class="col-4 text-left detail-item-money">
                <p class=detail-item-seat><span class="detail-item-seat-money-one" style=color:#19a0f0;></span></p>
            </div>
            <div class="col-4 text-center detail-item-money">
                <p class=detail-item-seat><span class="detail-item-seat-money-two" style=color:#19a0f0;></span></p>
            </div>
            <div class="col-4 text-right detail-item-money">
                <p class=detail-item-seat><span class="detail-item-seat-money-three" style=color:#19a0f0;></span></p>
            </div>

        </div>
    `
    return t
}

var hideDetail = function() {
    $('.container').hide()
    $('.detail-header').show()
    $('.detail-body').show()
}

var showHeaderInfo = function(info) {
    $('.detail-header-start').text(info.from)
    $('.detail-header-end').text(info.to)
    $('.detail-header-time').text(info.goDate)
}

var bindEvents = function() {
    let pre = $('.detail-header-pre')
    pre.on('click', function() {
        let goDate = $('.detail-header-time').text()
        let preDay = getPreDay(goDate)
        
        if (preDay >= getTime()) {
            $('.detail-body').empty()
            $('.detail-header-time').text(preDay)
            let v = init()
            let path = getPath(v)
            console.log('上一天ajax请求数据', v, path);
            ajax(path, v)
            $("body,html").animate({scrollTop:0},1000)
        }
    })
    
    let next = $('.detail-header-next')
    next.on('click', function() {
        let goDate = $('.detail-header-time').text()
        let nextDay = getNextDay(goDate)
        $('.detail-body').empty()
        $('.detail-header-time').text(nextDay)
        let v = init()
        let path = getPath(v)
        console.log('下一天ajax请求数据', v, path);
        ajax(path, v)
        $("body,html").animate({scrollTop:0},1000)
    })
}

var ajax = function(path, info) {
    console.log('访问ajax路径是: ', path);
    console.log('主页面传过来的信息：', info);
    $('.detail-body').empty()
    init()
    $.ajax({
        type: 'get',
        url: path,
        timeout: 5000,
        dataType: "json",
        async: false,
        success: function(r) {
            if (r == null || r.length <= 0) {
                var mType
                if (info.type == 'air') {
                    mType = '航班'
                } else {
                    mType = '车次'
                }
                $('.container-header').append(`
                <div class="row">
                    <div class="col" style="background: #ffbfbf; border-radius: .1rem;">
                        <p class="text-center" style="color: #780000;">这两个地方这一天没有${mType}噢</p>
                    </div>
                </div>
                `)
            } else {
                showHeaderInfo(info)
                for (let i = 0; i < r.length; i++) {
                    let ticket = getTicket(r[i], info)
                    if (info.check && ticket.train_num != "" && ticket.train_num.slice(0, 1) != 'G' && ticket.train_num.slice(0, 1) != 'D') {
                        continue
                    }
                    let seat = getValidSeat(r[i])
                    let secondGet = getSecondGetObject(r[i])
                    let t = template(ticket, seat, secondGet)
                    let detailBody = $('.detail-body')
                    detailBody.append(t)
                }
                // 隐藏所有的container, 显示当前的
                hideDetail()
            }
        },
        error: function(status) {
            console.log(status);
            $('.container-header').append(`
            <div class="row">
                <div class="col" style="background: #ffbfbf; border-radius: .1rem;">
                    <p class="text-center" style="color: #780000;">服务器不想理你，并向你丢了一个500错误</p>
                </div>
            </div>
            `)
        },
        complete: function(XMLHttpRequest,status) {
            if (status == 'timeout') {
                $('.container-header').append(`
                <div class="row">
                    <div class="col" style="background: #ffbfbf; border-radius: .1rem;">
                        <p class="text-center" style="color: #780000;">服务器开小差了=。=，再点点试试看吧</p>
                    </div>
                </div>
                `)
            }
        }
    })

    let item = $('.detail-item')
    item.bind('click', function() {
        let itemDiv = $(this)
        let a = itemDiv.data('train_no')
        let b = itemDiv.data('from_no')
        let c = itemDiv.data('to_no')
        let d = itemDiv.data('seat_type')
        let e = itemDiv.data('date')
        let secondPath = `http://192.168.1.31:8000/train_price_ajax/?train_no=${a}&from_no=${b}&to_no=${c}&seat_type=${d}&date=${e}`
        let m = itemDiv.find('.detail-item-money')
        if (m.is(':visible')) {
            m.hide()
        } else {
            $.ajax({
                type: 'get',
                url: secondPath,
                dataType: "json",
                async: false,
                success: function(r) {
                    let dict = {
                        '商务座': 'A9',
                        '一等座': 'M',
                        '二等座': 'O',
                        '高等软卧': 'A6' ,
                        '软卧': 'A4',
                        '动卧': 'F',
                        '硬卧': 'A3',
                        '软座': 'A2',
                        '硬座': 'A1',
                        '无座': 'WZ',
                    }
                    let seatOne = itemDiv.find('.detail-item-one').text().split(':')[0]
                    let seatMid = itemDiv.find('.detail-item-mid').text().split(':')[0]
                    let seatThree = itemDiv.find('.detail-item-three').text().split(':')[0]
                    let priceOne = r[dict[seatOne]] 
                    let priceMid = r[dict[seatMid]] 
                    let priceThree = r[dict[seatThree]] 
                    if (seatOne != "") {
                        itemDiv.find('.detail-item-seat-money-one').text(priceOne)
                    }
                    if (seatMid != "") {
                        itemDiv.find('.detail-item-seat-money-two').text(priceMid)
                    }
                    if (seatThree != "") {
                        itemDiv.find('.detail-item-seat-money-three').text(priceThree)
                    }
                    m.show()
                },
                error: function() {
                    console.log('获取价格失败，点点其他的试一下，或者刷新一下吧=。=');
                }
            })
        }
        console.log('显示');
    })
}

var detailMain = function(path, t) {
    ajax(path, t)
}

bindEvents()




