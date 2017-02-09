//-----------------------------------------------
//  DOCUMENT READY
//-----------------------------------------------

//-------------------------------------------------------------
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
// http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=1fe51b1165f6bcbfdc102f07d26e9469
//-------------------------------------------------------------
$(document).ready(function() {



  var lat, lon;


      $.ajax({
        url: 'http://ip-api.com/json',
        type: 'get',
        success: function(position){
          
          lat = position.lat;
          lon = position.lon;
          const city = position.city;
          const countryCode = position.countryCode;

          $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=1fe51b1165f6bcbfdc102f07d26e9469',
            type: 'get',
            success: function(data){


              const wIconCode = data.weather[0].icon;
              const wStatus = data.weather[0].description;
              const wIconUrl = "http://openweathermap.org/img/w/" + wIconCode + ".png";
              const temp = data.main.temp;
              const inner = $('.inner');
              const far = temp*1.8+32;
              const cel = temp;

              inner.append("<p class='inner-p'>" + countryCode + ", <span class='yellow'>" + city + "</span></p>")
              inner.append("<p class='inner-p'> Weather status: <span class='yellow'>" + wStatus + "</span></p>");
              inner.append("<p class='inner-p'> A little picture icon symbol on how it looks: <img class='iconClass' src='" + wIconUrl + "'></p>" );
              $('.metric').html(cel + "<a>&#176 C</a>");
              $('.metric').on('click', function(){
                var $this = $(this);
                $this.toggleClass('metric');
                if($this.hasClass('metric')){
                  $this.html(cel + "<a>&#176 C</a>");
                } else {
                  $this.html(far + '<a>&#176 F</a>');
                }
              });





            },
            error: function(err) {
              console.error('Error', err);
            }

    });
  }
});
});
