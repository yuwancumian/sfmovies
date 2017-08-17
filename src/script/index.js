require('../style/index.less')
var $ = require('jquery');
var films ;
var current_item = 0;

function init(){
    clearItems();
}
function clearItems(){
    $('#select_box').empty();
}
function match(str){
    clearItems();
    str = str.toLowerCase();
    for (var i = 0; i < films.length; i++) {
        if (films[i]['title'].toLowerCase().startsWith(str)) {
            $('#select_box').append('<div><span class="title">' + films[i]['title']  + '</span><span class="year"> ( '+  films[i]['release_year'] + ' )</span>' + '<span class="location">' + films[i]['locations'] + '</span> </div>');
        }
    }
}

$.ajax({
    url: "https://data.sfgov.org/resource/wwmu-gmzc.json",
    type: "GET",
    data: {
      "$limit" : 5000
    }
}).done(function(data) {
    console.log("Retrieved " + data.length + " records from the dataset!");
    console.log(data);
    films = data;
});

$('#search_input').on('input', function(){
    match($(this).val())  
});


$(document).on('click', '#select_box div',function(){
    var idx = $(this).index()
    console.log($('#select_box div').eq(idx).find('.location').html())
    $('#search_input').val($('#select_box div').eq(idx).find('.title').text())
    $('#pac_input').fadeIn();
    $('#pac_input').val($('#select_box div').eq(idx).find('.location').text())
    $('#pac_input').focus();
})
