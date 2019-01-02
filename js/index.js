var getInputText = function() {
    let from = $('#id-from').val().trim()
    let to = $('#id-to').val().trim()
    let goDate = $('.startDate').val().trim()
    let check = $('.check-input').is(':checked')

    let o = {
        from: from,
        to: to,
        goDate: goDate,
        check: check,
        type: ariTrainBus(),
    }
    return o
}

var getPath = function(o) {
    let flag = ariTrainBus()
    let path
    if (flag == 'air') {
        path = `http://192.168.1.31:8000/flight_data_ajax/?depCity=${o.from}&arrCity=${o.to}&date=${o.goDate}`
    } else if(flag == 'train'){
        path = `http://192.168.1.31:8000/train_data_ajax/?date=${o.goDate}&from_station=${o.from}&to_station=${o.to}`
    }
    return path
}

var ariTrainBus = function() {
    if($('.air-info-wrap').text().trim() == '国内') {
        return "air"
    } else {
        return "train"
    }
}

var indexMain = function() {
    let btnFind = $('.btn-set')
    btnFind.on('click', function() {
        var o = getInputText()
        var path = getPath(o)
        // 加载详情页
        detailMain(path, o)
    })

    let idFrom = $('#id-from')
    idFrom.on('click', function() {
        console.log('click id from');
        $('.container').hide()
        $('.citys-body .row').hide()
        $('.city-component-loc').text('出发城市')
        $('.citys-hot').show()
        $('.citys-header').show()
        $('.citys-body').show()
        $('.container-air').show()
        $('#city-component').addClass('city-component-active')
    })

    let idTo = $('#id-to')
    idTo.on('click', function() {
        $('.container').hide()
        $('.citys-body .row').hide()
        $('.city-component-loc').text('达到城市')
        $('.citys-hot').show()
        $('.citys-header').show()
        $('.citys-body').show()
        $('.container-air').show()
        $('#city-component').addClass('city-component-active')
    })

    $('.startDate').on('input', function() {
        console.log('日期的值：', $('.startDate').val());
    })

    // 日期默认填入当前日期
    $('.startDate').val(getTime())

    if (ariTrainBus() == "train") {
    // 默认填入宜春到南昌
        $('#id-from').val('宜春')
        $('#id-to').val('南昌')
    } else if (ariTrainBus() == "air") {
        $('#id-from').val('北京')
        $('#id-to').val('上海')
    }
    $('.sk-circle').hide()
}

indexMain()

$('.train-loc .img').bind('click', function() {
    var from = $('#id-from').val()
    var to = $('#id-to').val()
    $('#id-from').val(to)
    $('#id-to').val(from)
})