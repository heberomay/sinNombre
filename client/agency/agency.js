Template.agency.helpers ({
	service:function(){
		return services.find({owner:Meteor.userId()});
	}
})

Template.agency.events ({
	'click #add':function(e){
		e.preventDefault();
		$('#addService').modal('show');
	},
	'click #deleteService':function(e){
		e.preventDefault();
		Meteor.call('removeService',this._id,(error,response)=>{
			if(error){
				console.log(error)
				Bert.alert('Servicio no pudo ser eliminado','danger','growl-top-right');
			}else{
				Bert.alert('Servicio eliminado exitosamente','success','growl-top-right');
			}
		});
	},
	'click #editService':function(e){
		e.preventDefault();
		console.log('hola')
		Session.set('token_service',this._id);
		$('#editServiceModal').modal('show');
	}
});