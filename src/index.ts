import { sendMessage } from './lib/message/message';

import express from 'express';
var bodyParser = require('body-parser')

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.post( "/", ( req, res ) => {
  if(!req.body.number || !req.body.name) {
    console.log(req.body);
    res.sendStatus(400);
    return;
  }
  console.log(req.body.name + ':' + req.body.number);
  sendMessage(req.body.name + ':' + req.body.number);
  res.sendStatus(200);
} );

// start the Express server
app.listen( port, () => {
  console.log(`server started at http://localhost:${ port }` );
} );
