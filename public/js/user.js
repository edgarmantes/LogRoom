var practiceUser = "585d6b94328d0a4364614de5";

var getLogRoomIdsAndRenderList = function(){
	var ajax = $.ajax('/home/' + practiceUser, {
		type: 'GET',
		url: '/home/' + practiceUser
	}).done(function(data){ console.log(data) });
};




$(document).ready(function(){
	$('.js-getUserHome').on('click', function(event){
		evnet.preventDefault();
		getLogRoomIdsAndRenderList();		
	});

});