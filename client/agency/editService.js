Template.editService.onRendered(function(){
	$('#datetimepicker1').datetimepicker({
		format: 'HH:mm',
	});
});

Template.editService.helpers ({
	include:function(){
		Meteor.setTimeout(function(){ 
			$('#includeEdit').selectize({
				plugins: ['remove_button'],
				delimiter: ',',
				maxItems:3,
				persist: false,
				highlight: true,
				create: function(input) {
					return {
						value: input,
						text: input
					}
				}
			});
		},150);
		return false;
	},
	noInclude:function(){
		Meteor.setTimeout(function(){ 
			$('#noIncludeEdit').selectize({
				plugins: ['remove_button'],
				delimiter: ',',
				maxItems:3,
				persist: false,
				highlight: true,
				create: function(input) {
					return {
						value: input,
						text: input
					}
				}
			});
		},150);
		return false;
	},
	serviceOne:function(){
		return services.findOne({_id:Session.get('token_service')})
	}
})

Template.editService.events ({
	'click .scheduled button':function(e){
		e.preventDefault();
		if($(e.currentTarget).attr('active')=="true"){
			$(e.currentTarget).removeClass('active');
			$(e.currentTarget).attr('active',false);
		}else{
			$(e.currentTarget).addClass('active');
			$(e.currentTarget).attr('active',true);
		}
	},
	'click #addSche':function(e){
		e.preventDefault();
		$('.pre-hide').show();
		$('#date').val('');
		var ele=false
		var arr=$('.scheduled button.active');
		$('.scheduled button.btn-success').addClass('btn-warning');
		$('.scheduled button.btn-success').removeClass('btn-success');
		arr.addClass('btn-success');
		arr.prop('disabled',true);
		arr.removeClass('active');
		for (var i=0; i<arr.length;i++){
			if(!ele){
				ele=arr[i].value; 
			}else{
				ele=ele+'-'+arr[i].value
			} 
		}
		label='<div class="created-escheduled" id="'+ele+'"><label for="">'+ele+'<a href="#" id="removeSche" >remove</a></label></div>';
		$('.scheduled-parent').append(label);
	},
	'click #removeSche':function(e){
		e.preventDefault();
		var esc=$('.created-escheduled').attr('id');
		var array=esc.split('-');
		console.log(array)
		for (var i=0; i<array.length;i++){
			var arr=$('#'+array[i])
			arr.attr('active',false);
			arr.prop('disabled',false);
			arr.removeClass('btn-success');
			arr.removeClass('btn-warning');
		}
		$('#'+esc).remove();
		$('.pre-hide').hide();
	},
	'click #aprove':function(e){
		e.preventDefault();
		var i=$('.created-escheduled').length-1;
		var time=$('#date').val();
		if(time.length!=0){
			label='<h5 class="created-hour" id="'+time+'" >'+time+'<a href="#" id="remove"><i class="fa fa-times" aria-hidden="true"></i></a></h5>';
			$('.created-escheduled:eq('+i+')').append(label);
		}
	},
	'click #remove':function(e){
		e.preventDefault();
		$(e.currentTarget).parent().remove();
	},
	'click .removeBlock':function(e){
		e.preventDefault();
		$(e.currentTarget).parent().remove();
	},
	'change .inputImage': function (e, template) {
		var fsFile = new FS.File(e.target.files[0]);
		fsFile.metadata = {owner:Meteor.userId(),publication:false} 
		documents.insert(fsFile, function (err,fileObj) {
			if (err){ 
				Bert.alert('El archivo no pudo ser cargado', 'danger','growl-top-right');
				throw err;
			}else{
				$('.myProgress').show();
				elem=$('.myBar');
				width=1;
				$('#publications a').hide();
				imageUrl = Meteor.absoluteUrl() + "cfs/files/documents/" + fileObj._id;
				var intervalHandle = Meteor.setInterval(function () {
					width=width+Math.floor((Math.random()+1)*5);
					if(width<97){
					    elem.css('width',width+'%');
					}
					if (fileObj.hasStored("documents")) {
					// File has been uploaded and stored. Can safely display it on the page. 
						Session.set('imageUpload',fileObj._id);
						// file has stored, close out interval
						elem.css('width','100%');
						$('.myProgress').hide();
						$('#publications a').show();
						Meteor.clearInterval(intervalHandle);
						$('.image-name').show();
					}
				}, 100);
			}   
		});
    },
	'submit #editServiceForm':function(e){
		e.preventDefault();
		var comp={};
		valid=true;
		comp.name=$('#nameEdit').val();
		comp.cost=$('#costEdit').val();
		comp.minimun=$('#minEdit').val();
		comp.available=$('#availableEdit').val();
		comp.duration=$('#durationEdit').val();
		comp.description=$('#descriptionEdit').val();
		comp.noInclude=$('#noIncludeEdit').val().split(',');
		comp.include=$('#includeEdit').val().split(',');
		comp.owner=Meteor.userId();
		escheduled={};
		var esc=$('.created-escheduled');
		for (var i=0;i<esc.length;i++){
			var time=$('.created-escheduled:eq('+i+') .created-hour');
			//array time
			var crono=[]
			for(var k=0;k<time.length;k++){
				crono_=$('.created-escheduled:eq('+i+') .created-hour:eq('+k+')').attr('id');
				crono.push(crono_);
			}
			//object days
			var arr=$('.created-escheduled:eq('+i+')').attr('id');
			var hito=arr.split('-');
			for(var j=0;j<hito.length;j++){
			    escheduled[hito[j]]=crono;
			}
		}
		comp.escheduled=escheduled;
		if(valid){
			Meteor.call('addServiceOne',comp,(error,response)=>{
				if(error){
					console.log(error);
					Bert.alert('Servicio no pudo ser creado','danger','growl-top-right');
				}else{
					$('#addServiceForm')[0].reset();
					$('#addService').modal('hide');
					console.log('success');
				}
			});
		}
	}
});