$(document).ready(function() {

  var api_convert = {
    "chanceflurries":"snow-wind",
    "chancerain": "rain",
    "chancesleat": "sleet",
    "chancesnow": "snow",
    "chancetstorms": "thunderstorm",
    "clear": "day-sunny",
    "cloudy": "day-cloudy",
    "flurries": "snow-wind",
    "hazy": "day-haze",
    "mostlycloudy": "day-cloudy",
    "mostlysunny": "day-sunny",
    "partlycloudy": "day-cloudy",
    "partlysunny": "day-sunny",
    "rain": "showers",
    "sleat": "sleet",
    "snow": "snow",
    "sunny": "day-sunny",
    "tstorms": "thunderstorm",
    "unknown": "day-sunny"
  }

  $(".card").hide();

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
          
          $(".searchList").children().remove();
          console.log(result);
          $.each(result, function(index, res){
        
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
        // displayCondition(data.current_observation);
        $(".row.title").hide();
        var source_direct = $("#results-template").html();
        var template_direct = Handlebars.compile(source_direct);
        var input_direct = template_direct(data.current_observation);
        var source_convert =$("#icon-template").html();
        var template_convert = Handlebars.compile(source_convert);
        console.log(data.current_observation.icon);
        var content = api_convert[data.current_observation.icon];
        console.log(content);
        var input_convert = template_convert({
          "icon": content
        });
        $(".card").show();
        $(".displayWeather").html(input_direct);
        $(".placeholder-icon").html(input_convert);
      }
    });
  }

  $("input").on('keyup', function(){
    autocomplete();
  });

  $(".searchList").on('click', 'span', function(){
    var query = $(this).data("query");
    console.log("clicked " + query);
    getCondition(query);
    $("input").val("");
    $(".searchList").children().remove();
  });

  $("span").on('click', function(){
    $("input").val("");
  })

});
