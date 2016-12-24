var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;


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

var strategy = new BasicStrategy(function(username, password, callback) {
    User.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            callback(err);
            return;
        }

        if (!user) {
            return callback(null, false, {
                message: 'Incorrect username.'
            });
        }

        user.validatePassword(password, function(err, isValid) {
            if (err) {
                return callback(err);
            }

            if (!isValid) {
                return callback(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return callback(null, user);
        });
    });
});

passport.use(strategy);

// end of middleware

// Models required
var LogRoom = require('./models/LogRoom');
var Entries = require('./models/Entries');
var User = require('./models/User');

// routes

app.get('/user', function(req, res){
	res.status(200).sendFile(__dirname + '/public/html/user.html');
})

app.get('/user/:id', function(req, res){
	User.findById(req.params.id, function(err, user){
		if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(user.logroomIds);
		
	})
})

app.post('/users', jsonParser, function(req, res) {
    if (!req.body) {
        return res.status(400).json({
            message: "No request body"
        });
    }

    if (!('username' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: username'
        });
    }

    var username = req.body.username;

    if (typeof username !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: username'
        });
    }

    username = username.trim();

    if (username === '') {
        return res.status(422).json({
            message: 'Incorrect field length: username'
        });
    }

    if (!('password' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: password'
        });
    }

    var password = req.body.password;

    if (typeof password !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: password'
        });
    }

    password = password.trim();

    if (password === '') {
        return res.status(422).json({
            message: 'Incorrect field length: password'
        });
    }

    var user = new User({
        username: username,
        password: password,
    });

    user.save(function(err) {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        return res.status(201).json({});
    });

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            var user = new User({
                username: username,
                password: hash
            });

            user.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal server error'
                    });
                }

                return res.status(201).json({});
            });
        });
    });
});

app.get('/hidden', passport.authenticate('basic', {session: false}), function(req, res) {
    res.json({
        message: 'Luke... I am your father'
    });
});

app.post('/user', function(req, res){
	User.create({
		username: req.body.username,
		logroomIds: [],
	}, function(err, object){
		    if (err) {
            	return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(object);
	})
});

app.get('/home/:id', function(req, res) {
	res.status(200).sendFile(__dirname + '/public/html/home.html')

});


// app.get('/home/:id', function(req, res) {
// 	User.findById(req.params.id, function(err, data){
// 		console.log(data);
// 	})
// });

app.post('/logroom', function(req, res) {
	console.log('Inside POST logroom')
    LogRoom.create({
	    dateCreated: req.body.dateCreated, 
	    roomName: req.body.roomName, 
	    hostId: req.body.hostId,
    }, function(err, roomObject) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        console.log(roomObject)
        User.findOneAndUpdate(
        	{_id: roomObject.hostId}, 
        	{$push:{'logroomIds': roomObject._id}},
        	function(err, object){
        		if(err){
        			return res.status(500).json({
	                message: 'Internal Server Error'
	            	})
        		}
        	}
        );

        res.status(200).json(roomObject);
    });
});

// populates the Entries of LogRoom model in the HOME Page
app.get('/logroom/:id/json', function(req, res) {
	var logroomObject = LogRoom.findById(req.params.id)
	.populate('entries')
	.exec(function(err, data){
		res.status(200).json(data);
	});
})

app.get('/logroom/:id', function(req, res) {
	res.status(200).sendFile(__dirname + '/public/html/logroom.html')
});




app.delete('/logroom', function(req, res){
	LogRoom.find({_id: req.body._id}).remove().exec(function(err, logrooms){
		if (err) {
            	return res.status(500).json({
                message: 'Internal Server Error'
            	});
            } else if (logrooms.length > 0){
            	return res.status(200).json(logrooms)	
            } else {
            	console.log('No documents found')
            	return res.status(200).json();
            }
	});
});

app.post('/entries', function(req, res){
    // console.log(req.body)
	Entries.create({
		logEntry: req.body.logEntry,
        datePublished: req.body.datePublished,
        logRoomId: req.body.logRoomId
	}, function(err, entryObject){
        console.log(entryObject)
		if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        LogRoom.findOneAndUpdate(
        	{_id: entryObject.logRoomId}, 
        	{$push:{'entries': entryObject._id}}, 
        	function(err, logroom){
        	    if (err) {
	            	return res.status(500).json({
	                message: 'Internal Server Error'
	            });
	        }

        })
		
		return res.status(200).json(entryObject)
	})	
});

app.put('/entries', function(req, res){
	Entries.findOneAndUpdate(
		{_id: req.body.EntriesId}, 
		{$set:{'logEntry': req.body.logEntry}}, 
		function(err, entry){
			return res.status(200).json(entry);
		})
});

app.delete('/entries', function(req, res){

	Entries.find({_id: req.body.EntryId}).remove().exec(function(err, objects){
		        if (err) {
	            	return res.status(500).json({
	                message: 'Internal Server Error'
	            	});
	            } else if (objects.length > 0){
	            	return res.status(200).json(objects)	
	            } else {
	            	console.log('No documents found')
	            	return res.status(200).json();
	            }
	});

});

app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});



// end of routes
