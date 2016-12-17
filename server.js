var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Item = require('./models/item');

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
// end of middleware

// routes
app.get('/index', function(req, res) {
	res.status(200).sendFile(__dirname + '/public/index.html')
    // Item.find(function(err, items) {	
    //     if (err) {
    //         return res.status(500).json({
    //             message: 'Internal Server Error'
    //         });
    //     }
    //     res.status(200).sendFile(__dirname + '/public/index.html')
});

app.get('/home', function(req, res) {
	res.status(200).sendFile(__dirname + '/public/home.html')
    // Item.find(function(err, items) {	
    //     if (err) {
    //         return res.status(500).json({
    //             message: 'Internal Server Error'
    //         });
    //     }
    //     res.status(200).sendFile(__dirname + '/public/home.html')
    // });
});

app.get('/logroom', function(req, res) {
	res.status(200).sendFile(__dirname + '/public/logroom.html')
    // Item.find(function(err, items) {	
    //     if (err) {
    //         return res.status(500).json({
    //             message: 'Internal Server Error'
    //         });
    //     }

    //     res.status(200).sendFile(__dirname + '/public/logroom.html')
    // });
});

app.post('/items', function(req, res) {
    Item.create({
        name: req.body.name
    }, function(err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});

app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});
// end of routes


// app.listen(process.env.PORT || 8080);

exports.app = app;
exports.runServer = runServer;