$(document).ready(function() {

  function autocomplete(){
    keyword = $("input").val();
    console.log(keyword);
    if (keyword == ""){
      $(".searchList").children().remove();
    }
    else {
      $.ajax({
        url: 'http://autocomplete.wunderground.com/aq?query=' + keyword,
        method: 'GET',
        jsonp: 'cb',
        dataType: 'jsonp',
        success: function(data){
          result = data.RESULTS;
          $(".searchList").children().remove();
          // console.log(data.RESULTS);
          $.each(result, function(index, res){
            console.log(res.name);
            $(".searchList").append("<p><span>"+ res.name +"</span></p>");
          })
        }
      });
    }
  }

  $("input").on('keyup', function(){
    autocomplete();
  });

  $(".searchList").on('click', 'span', function(){
    var query = $(this).text();
    console.log("clicked " + query);
  });

});
