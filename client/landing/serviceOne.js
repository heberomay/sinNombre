Template.serviceOne.onRendered (function(){			
	$('#datetimepicker12').datetimepicker({
		format: 'L',
		inline: true,
	}).on('dp.change', function(e){ 
		var day = e.date._d.getDay();
		var array=['sun','mon','thu','wen','fri','sat']
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
	    schechuled=this.schechuled
		schechuled=schechuled[day]
		for (var i in schechuled){
			array.push({index:schechuled[i]})
		}
		return array;
	}
})

Template.serviceOne.events({
	'change #datetimepicker12':function(e){
		e.preventDefault();
		alert('hola')
		console.log('hola',$("#datetimepicker12").data("datetimepicker").getDate());
	}
})