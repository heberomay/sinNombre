Template.userNav.events ({
    'click #logout':function(){
		Meteor.logout(function(){
			Router.go('home');
		});
	}
})