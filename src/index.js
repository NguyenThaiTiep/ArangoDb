let express = require("express");
let http = require("http");
let { debug } = require("console");
let app = express();
let server = http.createServer(app);
require("./loader/connect").createConnect();
require("./router/index")(app);
server.listen(3005);
server.on("listening", onListening);
function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
