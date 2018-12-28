var express = require('express');
var app = express();
var port = 49152;

app.get('/', function(req, res) {
  console.log('testing server restart');
  console.log('updating hook permissions');
  res.send('I can\'t spell recieve - logs - ci working ✅');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
