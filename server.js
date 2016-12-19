var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));


// middleware
var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
};

exports.app = app;
exports.runServer = runServer;

// end of middleware

// Models required
var LogRoom = require('./models/LogRoom');
var Entries = require('./models/Entries');

// routes
app.get('/index', function(req, res) {
	res.status(200).sendFile(__dirname + '/public/index.html')
});

app.get('/home', function(req, res) {
	res.status(200).sendFile(__dirname + '/public/html/home.html')
});

app.get('/logroom', function(req, res) {
	res.status(200).sendFile(__dirname + '/public/html/logroom.html')
});

app.post('/logroom', function(req, res) {
    LogRoom.create({
	    dateCreated: req.body.dateCreated, 
	    Id: req.body.Id, 
	    guestsIdsAccepted: req.body.guestsIdsAccepted,
	    hostId: req.body.hostId,
    }, function(err, roomObject) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(roomObject);
    });
});

app.post('/entries', function(req, res){
	Entries.create({
		logEntry: req.body.logEntry
	}, function(err, object){
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(object);
	});
});

app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});
// end of routes


