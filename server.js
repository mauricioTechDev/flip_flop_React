const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();


 // log every request to the console
var morgan              = require('morgan');
app.use(morgan('dev'));



//middleware

app.use(cors());
app.use(express.json());

//routes

app.use("/authentication", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));


var port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});
