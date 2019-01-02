$('#search-start-citys').on('keyup', function() {
    $('.citys-body .row').hide()
    $('.citys-hot').hide()
    var inputVal = $('#search-start-citys').val()
    $('.citys-body .row').each(function() {
        var city = $(this)
        var code = city.data('code')
        if(inputVal != '' && code.toLowerCase().includes(inputVal.toLowerCase())) {            
            city.show()
        }
        var val = city.text()
        if(inputVal != '' && val.includes(inputVal)) {
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
    var mCity = $(this)
    if (l == '出发城市') {
        $('#id-from').val(mCity.text().trim())
    } else if (l == '达到城市') {
        $('#id-to').val(mCity.text().trim())
    } 
    // 清空city页输入框信息
    $('#search-start-citys').val('')
    goBackCity()
})

$('.hot-item-wrap').bind('click', function() {
    let l = $('.city-component-loc').text().trim()
    var mCity = $(this)
    if (l == '出发城市') {
        $('#id-from').val(mCity.text().trim())
    } else if (l == '达到城市') {
        $('#id-to').val(mCity.text().trim())
    }
    // 清空city页输入框信息
    $('#search-start-citys').val('')
    goBackCity()
})

