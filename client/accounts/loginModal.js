Template.loginModal.events ({
	'submit #logForm':function(e){
		e.preventDefault();
		var valid=true;
		username=$('#emailLog').val();
		password=$('#passwordLog').val();
		if(password.length==0){
			$('#logForm .form-group:eq(1)').addClass('has-error');
			valid=false;
		}
		if(username.length==0){
			$('#logForm .form-group:eq(0)').addClass('has-error');
			valid=false;
		}
		if(valid){
			$('#logForm .form-group').removeClass('has-error');
			Meteor.loginWithPassword(username,password);
			var check=Meteor.setInterval(function(){
				if(Meteor.user()){
					Meteor.clearInterval(check);
					$('#logForm')[0].reset();
					$('#loginModal').modal('hide');
				}
			},100);
			
					
		}
			
	}
});

