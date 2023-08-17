const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();

//showing demo records
router.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

const isInvalidDate = (data) => data.toUTCString() === "Invalid Date";

router.get("/api/", (req, res) => {
  res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() });
});

router.get("/api/:date?", (req, res) => {

  const dateParam = req.params.date;

  if (isInvalidDate(new Date(dateParam))&&isInvalidDate(new Date(+dateParam))) {
    res.json({ error: "Invalid Date" });
  } else{
    if(isInvalidDate(new Date(dateParam))){
      res.json({ unix: new Date(+dateParam).getTime(), utc: new Date(+dateParam).toUTCString() });
    }else{
      res.json({ unix: new Date(dateParam).getTime(), utc: new Date(dateParam).toUTCString()});
    }
  }

});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
