var express = require('express');
var app = express();
app.use('/app', express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.get('/*', function (req, res) {
  res.sendFile(__dirname+'/app/index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});