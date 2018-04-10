Template.configuracion.onCreated (function(){
	var self=this;
	GoogleMaps.ready('agencyMap', function(map) {
		var marker;
		// Create and move the marker when latLng changes.
		self.autorun(function() {
			if(!marker){
				if(Meteor.user().profile.location.lat==false && Meteor.user().profile.location.lng==false){
					var latLng = Geolocation.latLng();
				}else {
					var latLng = {lat:Meteor.user().profile.location.lat, lng:Meteor.user().profile.location.lng};
				}
				marker = new google.maps.Marker({
					draggable:true,
					animation: google.maps.Animation.Drop,
					position: new google.maps.LatLng(latLng.lat, latLng.lng),
					map: map.instance
				});
			}
			google.maps.event.addListener(map.instance, 'click', function(event){
				marker.setPosition({lat:event.latLng.lat(),lng:event.latLng.lng()})
				Meteor.users.update({_id:Meteor.userId()},{$set:{'profile.location':{lat:event.latLng.lat(),lng:event.latLng.lng()}}})	
			});
			
			google.maps.event.addListener(marker,'dragend', function(event){
				marker.setPosition({lat:event.latLng.lat(),lng:event.latLng.lng()})	
                Meteor.users.update({_id:Meteor.userId()},{$set:{'profile.location':{lat:event.latLng.lat(),lng:event.latLng.lng()}}})				
			});
		});
    });
});

Template.configuracion.helpers ({
	agency:function(){
		if(user2Role.find({user: Meteor.userId(), role: userRole.findOne({role: 'agency'})._id}).count()>0){
			return true
		}
	},
	geolocationError: function() {
		var error = Geolocation.error();
		return error && error.message;
	},
	agencyMapOptions: function() {	
		if(Meteor.user().profile.location.lat==false && Meteor.user().profile.location.lng==false){
			var latLng = Geolocation.latLng();
		}else {
			var latLng = {lat:Meteor.user().profile.location.lat, lng:Meteor.user().profile.location.lng};
	    }

	    if(latLng === undefined)
	    	latLng={lat:-34.6145638,lng:-58.3648654}
	    
        // Make sure the maps API has loaded and location was seted
        if (GoogleMaps.loaded() && latLng) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(latLng.lat, latLng.lng),
                zoom: 15,
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
	},
	user:function(){
		return Meteor.user();
	},
	selectize:function(){
		Meteor.setTimeout(function(){ 
			$('#area').selectize({
				plugins: ['remove_button'],
				delimiter: ',',
				maxItems:3,
				persist: false,
				highlight: true,
				create: function(input) {
					return {
						value: input,
						text: input
					}
				}
			});
	    },150);
		return false;
	}
})