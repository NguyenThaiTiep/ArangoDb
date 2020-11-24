let express = require("express");
let http = require("http");
let { debug } = require("console");
require("dotenv").config();
let app = express();
let server = http.createServer(app);
let morgan = require("morgan");
let cors = require("cors");
morgan.token("id", function getId(req) {
  return req.id;
});
const options = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: true,
};
app.use(cors(options));
app.use(morgan("dev"));
require("./loader/connect").createConnect();
require("./router/index")(app);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers");
});
server.listen(3005);
server.on("listening", onListening);
function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
