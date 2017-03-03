var parsehref = location.href.replace('?', '').split('/');
var logRoomId = parsehref[4]
var userId = null;

var d = new Date();
var month = d.getMonth() + 1;
var day = d.getDate();
var hours = d.getHours();
var minutes = d.getMinutes();
var timeDate = month + '/' + day + ' - ' + hours + ':' + minutes;

var submitAndGetEntry = function(){
	var entered = $('.entry').val();
	submitEntry(entered);
	$('.entry').val('');
};

var submitEntry = function(entry){

	var logged = {
		'logEntry': entry,
		'logRoomId': logRoomId,
		'datePublished': timeDate
	};
	var ajax = $.ajax('/entries', {
		type: 'POST',
		data: JSON.stringify(logged),
		dataType: 'json',
		contentType: 'application/json'
	}).done(function(data){
	    var listTag = $('<li></li><br>').html(data.datePublished + " - " + data.logEntry).attr('class', 'ent');
        $('.js-entries').append(listTag);
	});

};


function getAndDisplayStatusUpdates() {
	var parsehref = location.href.split('/');
	var logRoomId = parsehref[4]
    var ajax = $.ajax('/logroom/' + logRoomId + '/json', {
        type: 'GET', 
        dataType: 'json'
    }).done(function(data){
    	userId = data.hostId
    	$('.roomname').html(data.roomName);
    	$('.roomnumber').html(data._id);
        var entries = data.entries.forEach(function(entry){
        	var listTag = $('<li></li><br>').html(entry.datePublished + " - " + entry.logEntry).attr('class', 'ent');
            $('.js-entries').append(listTag);
        })
        addLogRoomNumToHomeButton();
    })
}

var addLogRoomNumToHomeButton = function(){
	$('.homebutton').attr('action', '/home/' + userId);
};


$(document).ready(function(){

	getAndDisplayStatusUpdates();

	$('.js-submit').on('click', '.button-submit', function(event){
		event.preventDefault();
		submitAndGetEntry();
	})

	$('.js-home').on('click', function(event){
		window.location.replace("/home/" + userId);
	});



});