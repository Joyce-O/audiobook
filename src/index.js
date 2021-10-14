const express = require("express");
const cors = require('cors');
const audioContent = require("./googleSpeechApi");

const app = express();
app.use(cors())
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send("hello world");
});


app.post("/record", async (req, res) => {
    const transacript = await audioContent(req.body.base64data);
    res.json({ success: true, transacript});
  });

app.listen(3000);
