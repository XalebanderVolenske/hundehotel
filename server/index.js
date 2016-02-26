var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var bookings = [];

// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyparser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin");
    next();
});

// Create Demodata
bookings.push({
    id:0,
    dogname: 'Edibert',
    dateFrom: '06-03-2016',
    dateTo: '08-03-2016'
});

bookings.push({
    id:1,
    dogname: 'Timmymann',
    dateFrom: '03-03-2016',
    dateTo: '09-03-2016'
});

bookings.push({
    id: 2,
    dogname: 'Xaledog',
    dateFrom: '01-03-2016',
    dateTo: '16-03-2016'
});



app.get('/', function (req, res) {
    res.send("Welcome to your Hundehotel Booking API");
});

app.get('/api/bookings', function (req, res) {
    res.send(bookings);
});


app.get('/api/bookings/:booking_id', function (req, res) {
    var id = req.params.booking_id;
    for(var i = 0; i < bookings.length; i++) {
        if(bookings[i].id == id) {
            res.type('json');
            res.status(200).send(bookings[i]);
            return;  // Verlassen der Function, sonst --> Error: Can't set headers after they are sent.
        }
    }
    res.status(404).send("Keine Buchung gefunden");
});

app.post('/api/bookings', function (req, res) {
    console.log(req.body);
    var booking = new Object();
    booking.id = findMaxId() + 1;
    booking.dogname = req.body.dogname;
    booking.dateFrom = req.body.dateFrom;
    booking.dateTo = req.body.dateTo;
    console.log(booking);
    bookings.push(booking);
    res.status(201).send(req.protocol + '://' + req.get('host') + req.originalUrl + '/' + booking.id);
});

app.put('/api/bookings/:booking_id', function(req, res) {
    var index = findById(req.params.booking_id);
    if(index == null) {
        res.status(404).send("No Booking found with id = " + req.params.booking_id);
    } else {
        if (req.body.dogname != null) {
            bookings[index].dogname = req.body.dogname;
        }
        if (req.body.dateFrom != null) {
            bookings[index].dateFrom = req.body.dateFrom;
        }
        if (req.body.dateTo != null) {
            bookings[index].dateTo = req.body.dateTo;
        }
        res.status(200).send(bookings[index]);
    }
});

app.delete('/api/bookings/:booking_id', function (req, res) {
    var index = findById(req.params.booking_id);
    if(index == null) {
        res.status(404).send("No Booking found with id = " + req.params.booking_id);
    } else {
        bookings.splice(index,1);
        res.status(204).send("Booking deleted with id = " + req.params.booking_id);
    }
})

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Hundehotel app listening at http://%s:%s', host, port);
});

// curl -H "Content-Type: application/json" -X GET  http://localhost:3000/api/todos
// curl -H "Content-Type: application/json" -X GET  http://localhost:3000/api/todos/1
// curl -H "Content-Type: application/json" -X POST -d '{"dogname" : "aaa", "dateFrom":"bbbbbb", "date":"01-02-2016"}' http://localhost:3000/api/todos
// curl -H "Content-Type: application/json" -X PUT -d '{"dateFrom":"make sport all day"}' http://localhost:3000/api/todos/1
// curl -H "Content-Type: application/json" -X PUT -d '{"dogname" : "holidays", "dateFrom":"make a journey", "date":"01-07-2016"}' http://localhost:3000/api/todos/2
// curl -X DELETE http://localhost:3000/api/todos/1

function findById(id) {
    console.log("id = " + id)
    for(var i = 0; i < bookings.length; i++) {
        if(bookings[i].id == id) {
            return i;
        }
    }
    return null;
}

function findMaxId() {
    var index = -1;
    for(var i = 0; i < bookings.length; i++) {
        if(i > index) {
            index = i;;
        }
    }
    return index;
}