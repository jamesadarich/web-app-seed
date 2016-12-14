import FinalHandler from "finalhandler";
import Http from "http";
import ServeStatic from "serve-static";

// Serve up public/ftp folder
var serve = ServeStatic('public/ftp', {'index': ['index.html', 'index.htm']})

// Create server
var server = Http.createServer(function onRequest (req, res) {
  serve(<any>req, <any>res, FinalHandler(req, res))
})

// Listen
server.listen(3000)