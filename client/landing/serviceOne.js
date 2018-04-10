Template.serviceOne.onRendered (function(){			
	$('#datetimepicker12').datetimepicker({
		format: 'L',
		inline: true,
	}).on('dp.change', function(e){ 
		var day = e.date._d.getDay();
		console.log("day",day)
		var array=['sun','mon','tue','wen', 'thu', 'fri', 'sat']
		Session.set('day',array[day]);
	})		
});

Template.serviceOne.helpers({
	services:function(){
		return services.find({owner:Session.get('owner')});
	},
	include:function(){
		array=[];
		token=this.include;
		for (var i in token){
			array.push({index:token[i]})
		}
		return array;
	},
	noInclude:function(){
		array=[];
		token=this.noInclude;
		for (var i in token){
			array.push({index:token[i]})
		}
		return array;
	},
	time:function(){
		var array=[]
		var day=Session.get('day')
	    scheduled=this.escheduled
	    console.log("scheduled",scheduled)
		scheduled=scheduled[day]
		for (var i in scheduled){
			array.push({index:scheduled[i]})
		}
		return array;
	}
})

Template.serviceOne.events({
	/*'change #datetimepicker12':function(e){
		e.preventDefault();
		alert('hola')
		console.log('hola',$("#datetimepicker12").data("datetimepicker").getDate());
	}*/
	'click #reserveOne':function(e){
		e.preventDefault()
		var objeto={}
		objeto.time=$("#timed").val()
		objecto.dia=Session.get('day')
		objeto.cupo=$("#quanty").val()
		objeto.token_service=this._id
		
		Meteor.call("addReserve"/*this._id*/,objeto,(error,response){
			if(!error)
				Bert.alert('successfully reserved','success','growl-top-right');
		})
		
	}
})