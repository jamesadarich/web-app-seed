import * as ServeStatic from "serve-static";
import * as Express from "express";
import * as Path from "path";

// Create server
const server = Express();

// Serve up public folder
server.use(ServeStatic("public", { index: ["index.html"] }));

// Serve up index as fallback for SPA
server.get('*', (req, res) => {
    res.sendFile('./public/index.html',  { root: Path.join(__dirname, '../public') });
});

// Listen
const portNumber = 3000;
server.listen(portNumber);
console.log("serving at port", portNumber);