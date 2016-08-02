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
          console.log(data);
          result = data.RESULTS;
          //TODO filter with key value current_observation
          $(".searchList").children().remove();
          console.log(result);
          $.each(result, function(index, res){
            // console.log(res.name);
            console.log(res);
            if(res.type == "city"){
            $(".searchList").append("<p><span data-query='" + res.zmw +"'>"+ res.name +"</span></p>");
            }
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
    var $display = $(".displayWeather");
    $display.children().remove();
    var location = "<p>" + observation.display_location.full + "</p>";
    var weather = "<p>" + observation.weather + "</p>";
    var temperatureC = "<p>" + observation.temp_c + " &deg;C</p>";
    var icon = "<img src='" + observation.icon_url + "'/>";
    
    $display.append(location);
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

  $("span").on('click', function(){
    $("nav").toggleClass("toggled");
  })

});
