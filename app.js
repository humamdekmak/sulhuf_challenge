var express     = require("express"),

	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
    app         = express();



app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/challenge',function(err) {
    if (err)
        return console.error(err);
});

app.use('/', require('./routes/index'));


var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function(){
   console.log("The challenge Server Has Started!");
});