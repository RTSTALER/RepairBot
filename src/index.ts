import { sendMessage } from './lib/message/message';

import express from 'express';
var bodyParser = require('body-parser')

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.post( "/", ( req, res ) => {
  if(!req.body.number) {
    res.sendStatus(400);
    return;
  }
  console.log(req.body.number);
  sendMessage(req.body.number);
  res.sendStatus(200);
} );

// start the Express server
app.listen( port, () => {
  console.log(`server started at http://localhost:${ port }` );
} );

// Steam
// zqxwcevrbtnymu,i.o/p1

// Qiwi
//za1xs2cd3vbf4bg6nh6