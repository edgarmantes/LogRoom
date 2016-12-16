var express = require('express');

var app = express();
app.use(express.static('public'));

app.get('/home', function(request, response){
	response.send('GET is working')
});


app.listen(process.env.PORT || 8080);

exports.app = app;