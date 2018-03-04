Template.signupModal.onRendered(function(){
	Session.set('role',false);
});

Template.signupModal.events ({
	'click .btn-false':function(e){
		e.preventDefault();
		role=$(e.currentTarget).attr('id');
		$('.btn-false').removeClass('active')
		$(e.currentTarget).addClass('active');
		Session.set('role',role);
		console.log(role);
	},
	'submit #signForm':function(e){
		e.preventDefault();
		var object={};
		var valid=true;
		object.email=$('#email').val();
		object.role=Session.get('role');
		if(object.role=="customer"){
			object.name=false;
			object.lastName=false;
			object.birthday=false;
			object.profilePic=false;
		}
		if(object.role=="agency"){
			object.name=false;
			object.profilePic=false;
			object.location={
				lat:false,
				lng:false
			}
		}
		username=$('#username').val();
		password=$('#password').val();
		var username_= new RegExp("^"+username);
		var email=new RegExp("^"+object.email);
	    if(Meteor.users.find({'username':{$regex: username_, $options: 'i'}}).count()>0){
			$('#signForm .form-group:eq(1)').addClass('has-error');
			valid=false;
		}
		if(Meteor.users.find({'emails.0.address':{$regex: email, $options: 'i'}}).count()>0){
			$('#signForm .form-group:eq(0)').addClass('has-error');
			valid=false;
		}
		if(password.length<6){
			$('#signForm .form-group:eq(2)').addClass('has-error');
			$('#signForm .form-group:eq(3)').addClass('has-error');
			valid=false;
		}
		if(password!=$('#passwordConfirm').val()){
			$('#signForm .form-group:eq(2)').addClass('has-error');
			$('#signForm .form-group:eq(3)').addClass('has-error');
			valid=false;
		}
		if(!Session.get('role')){
			valid=false;
		}
		td=$('#signForm .form-group')
		for(var i=0; i<td.length; i++){
			verify=$('#signForm .form-group > .form-control')[i].value;
			if(verify.length==0){
				$('#signForm .form-group:eq('+i+')').addClass('has-error');
				valid=false;
			}
		}
		if(valid){
			Meteor.call('createUserFromAdmin',object,password,username,(error,response)=>{
				if(error){console.log(error)}else{
					Meteor.loginWithPassword(object.email,password);
					$('.btn-false').removeClass('active');
					$('#signForm')[0].reset();
					$('#signupModal').modal('hide');
				}
			});
		}
	}
})

