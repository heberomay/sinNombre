Template.noUserNav.events({
	'click #login':function(e){
		e.preventDefault();
		$('#loginModal').modal('show');
	},
	'click #signup':function(e){
		e.preventDefault();
		$('#signupModal').modal('show');
	}
})