import * as express from "express";
import * as http from "http";
import * as morgan from "morgan";
require("dotenv").config();

import * as cors from "cors";
import * as bodyParser from "body-parser";
import { debug } from "console";

import { loader } from "./loader";
import { router } from "./router";

let app = express();

loader();

const options: cors.CorsOptions = {
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
  preflightContinue: false,
};
// app.use(cors(options));
// upload
app.use(cors(options));
app.use(express.static("public"));
app.use(express.static("public/avatar"));
app.use(express.static("public/apartment"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

morgan.token("id", function getId(req) {
  return req.id;
});
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("<h1>Web Server Timtro.vn</h1>");
});

var server = http.createServer(app);
router(app);

server.listen(process.env.PORT || 3001);
server.on("listening", onListening);
function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
