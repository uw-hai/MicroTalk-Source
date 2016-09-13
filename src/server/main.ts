/// <reference path="../common/def/express.d.ts"/>

import express = require("express");
var app = express();

app.use(express.static(__dirname + '/../client/static'));

app.listen(1338);

console.log('Listening on port 1338...');
