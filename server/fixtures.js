if(userRole.find().count()==0){
	userRole.insert({
		role: 'webmaster'
	});
	userRole.insert({
		role: 'agency'
	});
	userRole.insert({
		role: 'customer'
	});
};