const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();

//showing demo records
router.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.use('/', router);
module.exports.handler = serverless(app);
