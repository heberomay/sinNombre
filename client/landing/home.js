Template.home.onCreated(function() {
  GoogleMaps.ready('userMap', function(map) {
	    var markers = {};
		Meteor.users.find({'profile.role':'agency'}).observe({			
		    added: function(document) {
				// Create a marker for this document
				var marker = new google.maps.Marker({
				  position: new google.maps.LatLng(document.profile.location.lat, document.profile.location.lng),
				  map: map.instance,
				  id:document._id
				});
				
				google.maps.event.addListener(marker ,'click',function(){
					Session.set('owner',marker.id)
					$('#serviceOne').modal('show');
				});
				
				google.maps.event.addListener(map.instance ,'click',function(){
					$('#serviceOne').modal('hide');
				});
			}
		});
		
		
    });
	
	
	var luxe=Meteor.setInterval(function(){
		if (GoogleMaps.loaded()) {
			input = document.getElementById('locationSearch'); 
			autocomplete = new google.maps.places.Autocomplete(input); 
			// When the user selects an address from the dropdown, 
			google.maps.event.addListener(autocomplete, 'place_changed', function() { 
				 var place = autocomplete.getPlace(); 
				 DestLat= place.geometry.location.lat();
                 DestLng = place.geometry.location.lng();
				 console.log("place: " + DestLat + " " + DestLng ); 
				 GoogleMaps.maps.userMap.instance.setCenter({lat:DestLat,lng:DestLng});
			     GoogleMaps.maps.userMap.instance.setZoom(12);
			}); 
		
		Meteor.clearInterval(luxe);
		}
	},10)
});

Template.home.helpers({
	/*geolocationError: function() {
		var error = Geolocation.error();
		return error && error.message;
	},*/
    userMapOptions: function() {
		var latLng = Geolocation.latLng();
		if(latLng==undefined)
			latLng = {lat:-34.6145638,lng:-58.3648654}
        // Make sure the maps API has loaded
        if (GoogleMaps.loaded() && latLng) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(latLng.lat, latLng.lng),
                zoom: 10,
				disableDefaultUI: true,
				styles: [{
					 featureType: "road",
					 elementType: "labels",
					 stylers: [
					   { visibility: "off" }
					 ]
				   }]
            };
        }
    },
	reloadMap:function(){
		Meteor.setTimeout(function(){
			google.maps.event.trigger(GoogleMaps.maps.exampleMap.instance, 'resize');
		},2000)
	}
});


