var express = require('express');
var app = express();
var port = 49152;

app.get('/', function(req, res) {
  console.log('getting homepage');
  res.send('post recieve - logs - ci working ✅');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
