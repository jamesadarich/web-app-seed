import * as FinalHandler from "finalhandler";
import * as Http from "http";
import * as ServeStatic from "serve-static";

// Serve up public folder
const serve = ServeStatic("public", { index: ["index.html"] });

// Create server
const server = Http.createServer((req, res) => {
  serve(<any>req, <any>res, FinalHandler(req, res));
  console.log(req.url);
})

// Listen
const portNumber = 3000;

server.listen(portNumber);

console.log("serving at port", portNumber);