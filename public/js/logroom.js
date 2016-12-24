	var parsehref = location.href.split('/');
	var logRoomId = parsehref[4]

var submitAndGetEntry = function(){
	console.log('inside first func')
	var entered = $('.entry').val();
	submitEntry(entered);
	$('.entry').val('');
};

var submitEntry = function(entry){

	var logged = {
		'entry': entry,
		'_id': logRoomId
	};
	var ajax = $.ajax('/entries', {
		type: 'POST',
		data: JSON.stringify(logged),
		dataType: 'json',
		contentType: 'application/json'
	}).done(function(data){
		console.log('got back data')
	});

};


function getAndDisplayStatusUpdates() {
	var parsehref = location.href.split('/');
	var logRoomId = parsehref[4]
	console.log(logRoomId)
    var ajax = $.ajax('/logroom/' + logRoomId + '/json', {
        type: 'GET', 
        dataType: 'json'
    }).done(function(data){
    	console.log(data)
        var entries = data.entries.forEach(function(entry){
        	console.log()
            $('.js-entries').append(entry.logEntry + '<br>');
        })
    })
}



$(document).ready(function(){
	getAndDisplayStatusUpdates();

	$('.js-submit').on('click', '.button-submit', function(event){
		event.preventDefault();
		submitAndGetEntry();
	})


});