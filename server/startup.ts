import * as Compression from "compression";
import * as Express from "express";
import * as Path from "path";
import * as ServeStatic from "serve-static";
import * as Http from "http";
import * as Https from "https";

const portNumber: number = 3000;
const securePortNumber: number = 3001;
const sslOptions = {
  key: fs.readFileSync('./keys/private.key'),
  cert: fs.readFileSync('./keys/cert.crt'),
  ca: fs.readFileSync('./keys/intermediate.crt')
};

// create server
const app = Express();
const httpServer = Http.createServer(app);
const httpsServer = Https.createServer({}, app);

// setup compression
app.use(Compression());

// don"t expose x-powered-by express header
app.disable("x-powered-by");

// serve up public folder
app.use(ServeStatic(
    "dist",
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
    })
);

// https only
app.use((request, response, next) => {
    console.log("request.secure", request.secure);
    if (!request.secure) {
        const httpsRedirectUrl = `https://${request.headers.host.replace(portNumber, securePortNumber)}${request.path}`;
        response.writeHead(301, { "Location":  httpsRedirectUrl });
        response.end();
        console.log(`redirected ${request.url} to ${httpsRedirectUrl}`);
    }

    next();
});

// serve up index as fallback for SPA
app.get("*", (request, response) => {
    response.sendFile("/index.html", { root: Path.join(__dirname, "../dist") });
});

// listen
httpServer.listen(portNumber);
httpsServer.listen(securePortNumber);
process.stdout.write("serving at port " + portNumber + " and https at " + securePortNumber);
