$(document).ready(function() {

  function autocomplete(){
    keyword = $("input").val();
    console.log(keyword);
    if (keyword == ""){
      $(".display").children().remove();
    }
    else {
      $.ajax({
        url: 'http://autocomplete.wunderground.com/aq?query=' + keyword,
        method: 'GET',
        jsonp: 'cb',
        dataType: 'jsonp',
        success: function(data){
          result = data.RESULTS;
          $(".display").children().remove();
          // console.log(data.RESULTS);
          $.each(result, function(index, res){
            console.log(res.name);
            $(".display").append("<p>"+ res.name +"</p>");
          })
        }
      });
    }
  }

  $("input").on('keyup', function(){
    autocomplete();
  });

  $("display").on('click', 'p', function(){
    console.log("clicked city");
  });

});
