Meteor.startup(function () {

//Meteor methods.
Meteor.methods({
	createUserFromAdmin: function(object,password,username){
        Accounts.createUser({email:object.email,password:password,username:username,profile:object});
		user2Role.insert({user: Meteor.users.findOne({username: username})._id, role: userRole.findOne({role: object.role})._id});
    },
	'addServiceOne':function(objeto){
		services.insert(objeto)
	},
	'removeService':function(id){
		services.remove({_id:id})
	}

});

});