import * as ServeStatic from "serve-static";
import * as Express from "express";

// Create server
const server = Express();

// Serve up public folder
server.use(ServeStatic("public", { index: ["index.html"] }));

// Serve up index as fallback for SPA
server.get('*', (req, res) => {
    res.sendfile('./public/index.html');
});

// Listen
const portNumber = 3000;
server.listen(portNumber);
console.log("serving at port", portNumber);