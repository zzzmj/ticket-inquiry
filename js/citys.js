$('#search-start-citys').on('keyup', function() {
    $('.citys-body .row').hide()
    $('.citys-hot').hide()
    var inputVal = $('#search-start-citys').val()
    console.log(inputVal);
    $('.citys-body .row').each(function() {
        var city = $(this)
        var code = city.data('code')
        if(inputVal != '' && code.toLowerCase().includes(inputVal.toLowerCase())) {            
            console.log(`${city} 显示`);
            city.show()
        }
        var val = city.text()
        if(inputVal != '' && val.includes(inputVal)) {
            console.log(`${city} 显示`);
            city.show()
        }
    })
})

let back = $('.datail-back')
back.on('click', function() {        
    goBackCity()
})

var goBackCity = function() {
    $('.container').hide()
    $('.container-header').show()
    $('.container-air').show()
    $('#city-component').removeClass('city-component-active')
}

$('.citys-body .row').bind('click', function() {
    let l = $('.city-component-loc').text().trim()
    console.log($(this))
    var mCity = $(this)
    if (l == '出发城市') {
        console.log('出发城市是：', mCity.text());
        $('#id-from').val(mCity.text().trim())
    } else if (l == '达到城市') {
        console.log('到达城市是：', mCity.text());
        $('#id-to').val(mCity.text().trim())
    } else {
        console.log(`信息有误 l: ${l} city: ${mCity.text()}`);
    }
    // 清空city页输入框信息
    $('#search-start-citys').val('')
    goBackCity()
})

$('.hot-item-wrap').bind('click', function() {
    let l = $('.city-component-loc').text().trim()
    console.log($(this))
    var mCity = $(this)
    if (l == '出发城市') {
        console.log('出发城市是：', mCity.text());
        $('#id-from').val(mCity.text().trim())
    } else if (l == '达到城市') {
        console.log('到达城市是：', mCity.text());
        $('#id-to').val(mCity.text().trim())
    } else {
        console.log(`信息有误 l: ${l} city: ${mCity.text()}`);
    }
    // 清空city页输入框信息
    $('#search-start-citys').val('')
    goBackCity()
})

