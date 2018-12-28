var express = require('express');
var app = express();
var port = 49152;

app.get('/', function(req, res) {
  console.log('getting homepage');
  res.send('hello world');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
