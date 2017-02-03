import * as Compression from "compression";
import * as Express from "express";
import * as Path from "path";
import * as ServeStatic from "serve-static";

// create server
const server: Express.Application = Express();

// setup compression
server.use(Compression());

// don"t expose x-powered-by express header
server.disable("x-powered-by");

// serve up public folder
server.use(ServeStatic(
    "public/dist",
    { 
        index: ["index.html"],
        // default cache to 1 day
        maxAge: "1d",
        // enable content based cache control
        setHeaders: (response, path) => {
            
            if (ServeStatic.mime.lookup(path) === "text/html") {
                // don't cache html
                response.setHeader("Cache-Control", "no-cache");
            }
            else if (/\/(css|javascript)$/.test(ServeStatic.mime.lookup(path))) {
                // cache css and javascript for a year as we bust it automatically
                response.setHeader("Cache-Control", "public, max-age=31536000");
            }
        }
    }));

// serve up index as fallback for SPA
server.get("*", (request, response) => {
    response.sendFile("/index.html", { root: Path.join(__dirname, "../public/dist") });
});

// listen
const portNumber: number = 3000;
server.listen(portNumber);
process.stdout.write("serving at port " + portNumber);
