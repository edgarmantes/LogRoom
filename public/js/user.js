

var getLogRoomIdsAndRenderList = function(data){
	var ajax = $.ajax('/home/' + data, {
		type: 'GET',

	}).done(function(page){ 
		$('.hide').attr('action', '/home/' + data);
		$('.hideB').trigger('click');
	});
};


var signUp = function(){
	var signup = {
		'usernameup' : $('.usernameup').val(),
		'passwordup' : $('.passwordup').val()
	}
	var ajax = $.ajax('/users', {
		type: 'POST',
		data: JSON.stringify(signup),
		dataType: 'json',
		contentType: 'application/json'
	}).done(function(data){
		getLogRoomIdsAndRenderList(data)
	})
};

var signIn = function(){
	var signin = {
		'usernamein': $('.usernamein').val(),
		'passwordin': $('.passwordin').val()
	}
	var ajax = $.ajax('/users/signin', {
		type: 'POST',
		data: JSON.stringify(signin),
		dataType: 'json',
		contentType: 'application/json'
	}).done(function(data){
		getLogRoomIdsAndRenderList(data);
	})
};

$(document).ready(function(){
	$('.js-signup').on('submit', function(event){
		event.preventDefault();
		signUp();
	});

	$('.js-signin').on('submit', function(event){
		event.preventDefault();
		signIn();
	});

});