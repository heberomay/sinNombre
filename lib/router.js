Router.configure({
    layoutTemplate: 'layout',
	loadingTemplate: 'loading',
    notFoundTemplate: 'paginaNoExiste'
});

Router.route('/',{name: 'home',
    waitOn: function(){
        return [        
			Meteor.subscribe('allUsers'),
			Meteor.subscribe('userRole'),
			Meteor.subscribe('user2Role')
	
        ]
	},
	data: function(){
		if(Meteor.user()){
			if(user2Role.find({user: Meteor.userId(), role: userRole.findOne({role: 'webmaster'})._id}).count() > 0){
				Router.go('administrador');
			};
			if(user2Role.find({user: Meteor.userId(), role: userRole.findOne({role: 'agency'})._id}).count() > 0){
				Router.go('agency');
			};
		}
		return false;
	},
	action : function () {
        if (this.render()){
		    this.render('noUserNav',{to:'noUserNav'});
			this.render('home');
	    }
	
	}
});

Router.route('/agency',{name: 'agency',
    waitOn: function(){
        return [        
			Meteor.subscribe('allUsers'),
			Meteor.subscribe('userRole'),
			Meteor.subscribe('user2Role')
        ]
	},
	data: function(){
		return false;
	},
	action : function () {
       if (Meteor.user() && user2Role.find({user: Meteor.userId(), role: userRole.findOne({role: 'agency'})._id}).count()>0){
		    this.render('userNav',{to:'userNav'});
			this.render('agency');
		}else {
			Router.go('home');
		}
	}
});

Router.route('/configuration',{name: 'configuracion',
    waitOn: function(){
        return [        
			Meteor.subscribe('allUsers'),
			Meteor.subscribe('userRole'),
			Meteor.subscribe('user2Role')
        ]
	},
	data: function(){
		$('body').get(0).style.setProperty("background", '#ddd');
		return false;
	},
	action : function () {
       if (Meteor.user()){
		    this.render('userNav',{to:'userNav'});
		    this.render('configuracion');
		}else {
			Router.go('home');
		}
	}
});
