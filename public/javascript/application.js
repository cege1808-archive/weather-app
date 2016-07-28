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
          // console.log(result);
          $.each(result, function(index, res){
            // console.log(res.name);
            // console.log(res);
            $(".searchList").append("<p><span data-query='" + res.zmw +"'>"+ res.name +"</span></p>");
          })
        }
      });
    }
  }

  function getCondition(query){
    $.ajax({
      url: 'http://api.wunderground.com/api/500a16a262073dee/conditions/q/zmw:' + query + '.json',
      method: 'GET',
      jsonp: 'callback',
      dataType: 'jsonp',
      success: function(data){
        console.log(data);
        displayCondition(data.current_observation);
      }
    });
  }

  function displayCondition(observation){
    console.log(observation.weather);
    console.log(observation.temp_c);
    console.log(observation.icon_url);

    var weather = "<p>" + observation.weather + "</p>";
    var temperatureC = "<p>" + observation.temp_c + "</p>";
    var icon = "<img src='" + observation.icon_url + "'/>";
    var $display = $(".displayWeather");

    $display.append(weather);
    $display.append(temperatureC);
    $display.append(icon);
  }


  $("input").on('keyup', function(){
    autocomplete();
  });

  $(".searchList").on('click', 'span', function(){
    var query = $(this).data("query");
    console.log("clicked " + query);
    getCondition(query);
  });

});
