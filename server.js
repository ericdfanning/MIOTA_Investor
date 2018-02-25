const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const cronScan = require('./cronJob')
const emailCron = require('./emailCron')

const port = 8000
app.set('port', port);
app.listen(app.get('port'), function() {
  console.log('Listening on port: ', port)
});

app.use(bodyParser.json()); // allows you to retrieve data from the body of requests made to this server
app.use(cors()); // sets up the headers to allow cross origin requests

app.get('/', function(req, res) {
	// this block will execute every time someone successfully navigates to the homepage. 
	res.status(200)
	res.send('Hey there duderooski!!1')
})
