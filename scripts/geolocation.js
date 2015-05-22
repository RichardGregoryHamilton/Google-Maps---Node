
// Determine support for Geolocation

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(displayPosition, errorFunction);
  } else {
      alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
  }
  
  // Success callback function
  
  function displayPosition(pos) {
    var mylat = pos.coords.latitude;
    var mylong = pos.coords.longitude;
    
    var thediv = document.getElementById('locationinfo');
    
    //Load Google Maps
    
    var latlng = new google.maps.LatLng(mylat, mylong);
    var latlngBefore = new google.maps.LatLng(localStorage.latitudeThis, localStorage.longitudeThis);
    
    //Calculate distance between two points
    
    var distance = google.maps.geometry.spherical.computeDistanceBetween (latlng, latlngBefore);
    var conversion = 1000; //factor of conversion between meters and kilometers
    var distance = (distance/conversion);
    
    //Prints the two locations and the distance between them
    
    thediv.innerHTML = '<p>Your longitude is : ' +
      mylong + ' and your latitude is : ' + mylat + '<p>' +
      '<p>Your last longitude was : ' + localStorage.longitudeThis +
      ' and your last latitude was : ' + localStorage.latitudeThis + '<p>' +
      '<p>The distance between these two points is :'+ distance + ' km' + '</p>'; 
  
    var myOptions = {
      zoom: 15,
      center: new google.maps.LatLng(mylat, mylong),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
     
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  
    //Add markers
    
    var marker = new google.maps.Marker({
       position: latlng, 
       map: map, 
       title:"You are here"
    });

    var marker = new google.maps.Marker({
       position: latlngBefore, 
       map: map, 
       title:"You were here"
    });
  
    //Center map
    
    var bounds = new google.maps.LatLngBounds();  
    bounds.extend(latlng);
    bounds.extend(latlngBefore);
    map.fitBounds(bounds);
    
    localStorage.latitudeThis = mylat;
    localStorage.longitudeThis = mylong;      
  }
  
  // Error callback function
  
  function errorFunction(pos) {
      alert('Error!');
  }
  
   $(function() {
      $("#saveButtonLatitude").on('click', function() {
          localStorage.latitudeThis = $("#editorLat").val();
          $("#visorlat").html("Latitud guardada : " + localStorage.latitudeThis);
          $(".edit").hide();
          $(".view").show();
      });
      
      $("#editButtonLatitude").on('click', function() {
          $("#editorLat").val(localStorage.latitudeThis);
          $(".edit").show();
          $(".view").hide();
      });
      
      $("#saveButtonLongitude").on('click', function() {
          localStorage.longitudeThis = $("#editorLong").val();
          $("#visorlong").html("Longitud guardada " + localStorage.longitudeThis);
          $(".edit").hide();
          $(".view").show();
      });
      
      $("#editButtonLongitude").on('click', function() {
          $("#editorLong").val(localStorage.longitudeThis);
          $(".edit").show();
          $(".view").hide();
      });
      
      $("#visorlat").html("Latitude Last : " + localStorage.latitudeThis || "");
      $("#visorlong").html("Longitude Last : " + localStorage.longitudeThis || "");
      $(".edit").hide();
      $(".view").show();
    });
    
    //Determine support for iPhone and Android
      function detectBrowser() {
          var useragent = navigator.userAgent;
          var mapdiv = document.getElementById("map_canvas");
          if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
              mapdiv.style.width = '100%';
              mapdiv.style.height = '100%';
          } else {
              mapdiv.style.width = '600px';
              mapdiv.style.height = '800px';
          }
      }
      