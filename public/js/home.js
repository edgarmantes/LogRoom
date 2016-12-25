var urlIds = location.href.replace('?', '').split('/');
var userId = urlIds[4];

var d = new Date();
var month = d.getMonth();
var day = d.getDay();
var hours = d.getHours();
var minutes = d.getMinutes();
var timeDate = month + '/' + day + ' - ' + hours + ':' + minutes;

var getLogRoomIds = function(){
	var urlIds = location.href.split('/');
	var userId = urlIds[4];

	var ajax = $.ajax('/user/' + userId, {
		type: 'GET',
		dataType: 'json'
	}).done(function(data){
		getEachLogRoomInfo(data);
	});
};

var getEachLogRoomInfo = function(list){
	list.forEach(function(id){
		var ajax = $.ajax('/logroom/' + id +'/json', {
			type: 'GET',
			dataType: 'json'
		}).done(function(data){
			renderEachLogRoomInfo(data);
		})
	});
};

var renderEachLogRoomInfo = function(data){
	var urlIds = location.href.split('/');
	var userId = urlIds[4];

	var link = $('<a>').attr('href', '/logroom/' + data._id);
	var roomContainer = $('<div>').attr('class', 'rooms-container');
	var unList = $('<ul>').attr('class', 'roomcontainer');
	var listName = $('<li>').html('<strong>Room Name:</strong> ' + data.roomName);
	var roomNum = $('<li>').html('&nbsp - <strong>Room Number:</strong> ' + data._id);
	var date = $('<li>').html('&nbsp - <strong>Date Created:</strong> ' + data.dateCreated);
	var UL = unList.append(listName).append(roomNum).append(date);
	var divCon = roomContainer.append(UL);
	var logRoomTag = link.append(divCon); 
	$('.listedrooms').append(logRoomTag)
};

var createLogRoom = function(){
	var roomName = $('.newLogName').val();
	var passed = {
		'dateCreated': timeDate, 
	    'roomName': roomName, 
	    'hostId': userId,
	}

	var ajax = $.ajax('/logroom', {
		type: 'POST',
		data: JSON.stringify(passed),
		dataType: 'json',
		contentType: 'application/json'
	}).done(function(data){
		renderEachLogRoomInfo(data);
		$('.newLogName').val('');
	});
};



$(document).ready(function(){
	getLogRoomIds();

	$('.newroom-form').on('submit', function(event){
		event.preventDefault();
		createLogRoom();
	});
})