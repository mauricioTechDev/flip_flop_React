const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path')

require("dotenv").config();


 // log every request to the console
var morgan              = require('morgan');
app.use(morgan('dev'));



//middleware

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')))

if(process.env.NODE_ENV === 'production'){
  // serve static content
  // npm run build holds all the static content and I have to aim for the inced.html fil withing that build folder
  // inside the static() I have to say the location of the build folder
  app.use(express.static(path.join(__dirname, 'client/build')))
}
//routes

app.use("/authentication", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));




var port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});
