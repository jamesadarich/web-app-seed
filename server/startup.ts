import * as Compression from "compression";
import * as Express from "express";
import * as Path from "path";
import * as ServeStatic from "serve-static";

// create server
const server: Express.Application = Express();

// setup compression
server.use(Compression());

// enable content based cache control
server.enable("etag");

// don't expose x-powered-by express header
server.disable('x-powered-by');

// serve up public folder
server.use(ServeStatic("public/dist", { index: ["index.html"] }));

// serve up index as fallback for SPA
server.get("*", (request, response) => {
    response.sendFile("/index.html", { root: Path.join(__dirname, "../public/dist") });
});

// listen
const portNumber: number = 3000;
server.listen(portNumber);
process.stdout.write("serving at port " + portNumber);
