// load .env data into process.env
require('dotenv').config();
const db = require('./server/database');
// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require("cookie-session");

app.use(cookieSession({
  name: "session",
  keys: ["lknt42fnoh90"],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static("public"));
// set to routers 
const indexRoutes = require("./routes/index");

app.use(indexRoutes(db));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});