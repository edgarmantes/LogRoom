

















// // this function's name and argument can stay the
// // same after we have a live API, but its internal
// // implementation will change. Instead of using a
// // timeout function that returns mock data, it will
// // use jQuery's AJAX functionality to make a call
// // to the server and then run the callbackFn
// var db = "585730b3f5a1e91878d36ab1"

// function getRecentStatusUpdates(callbackFn) {
//     var ajax = $.ajax('/logroom/' + db, {
//         type: 'GET', 
//         dataType: 'json'
//     }).done(function(data){
//         console.log(data);
//         var entries = data.entries.forEach(function(entry){
//             console.log(entry.logEntry)
//             $('.js-entries').append(entry.logEntry + '<br>');
//         })
//     })
// }

// // this function stays the same when we connect
// // to real API later
// function displayStatusUpdates(data) {
//     for (index in data.statusUpdates) {
// 	   $('body').append(
//         '<p>' + data.entries[index].guestName + ", " +data.entries[index].message + '</p>');
//     }
// }

// // this function can stay the same even when we
// // are connecting to real API
// function getAndDisplayStatusUpdates() {
// 	getRecentStatusUpdates(displayStatusUpdates);
// }

// var initial = function(){
//     $('.js-logroom').submit(function(event){
//         event.preventDefault();
//         var ajax = $.ajax('/home', {
//             method: 'GET',
//             url: '/home',
//             dataType: 'html'
//         })
//     });

//     $('.getentries').on('click', function(event){
//         event.preventDefault();
//         getAndDisplayStatusUpdates();
//     });
// };

// $(document).ready(function(){
//     initial();
// });
// //  on page load do this
// // $(function() {
// // 	getAndDisplayStatusUpdates();
// // })