import * as Compression from "compression";
import * as Express from "express";
import * as Path from "path";
import * as ServeStatic from "serve-static";

// create server
const server: Express.Application = Express();

// setup compression
server.use(Compression());

// serve up public folder
server.use(ServeStatic("public", { index: ["index.html"] }));

// serve up index as fallback for SPA
server.get("*", (request, response) => {
    response.sendFile("/index.html", { root: Path.join(__dirname, "../public") });
});

// listen
const portNumber: number = 3000;
server.listen(portNumber);
process.stdout.write("serving at port " + portNumber);
