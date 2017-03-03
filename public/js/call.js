var signIn = function(){
	var signin = {
		'usernamein': "demo",
		'passwordin': "123"
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

var getLogRoomIdsAndRenderList = function(data){
	var ajax = $.ajax('/home/' + data, {
		type: 'GET',

	}).done(function(page){ 
		$('.hide').attr('action', '/home/' + data);
		$('.hideB').trigger('click');
	});
};


var signInPage = function(){
		var ajax = $.ajax('/signin/', {
		type: 'GET',
		dataType: 'html',
		success: function(html){
			$('.greenback').html(html)
		},
	})
};

var signUpPage = function(){
		var ajax = $.ajax('/signup/', {
		type: 'GET',
		dataType: 'html',
		success: function(html){
			$('.greenback').html(html)
		},
	})
};




$(document).ready(function(){
	$('.js-signin').on('click', function(event){
		event.preventDefault();
		signInPage();
	})

	$('.js-signup').on('click', function(event){
		event.preventDefault();
		signUpPage();
	})

	$('.demo-btn').on('click', function(event){
		event.preventDefault();
		signIn();
	});
});