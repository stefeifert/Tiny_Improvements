const express = require('express');
const keys = require("./config/keys.js");
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const app = express();
const db = require('./models')
const mongodb_URI = require("./config/keys.js")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


mongoose.connect(mongodb_URI, { useNewUrlParser: true });
// mongoose.connect(process.env.mongodb_URI || 'mongodb://localhost/tinyImprovements', { useNewUrlParser: true });

require('./routes/api-routes')(app);

app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});