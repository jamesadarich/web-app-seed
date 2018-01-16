import * as Http from "http";
import * as Https from "https";
import * as Path from "path";
import * as ServeStatic from "serve-static";
import { Application } from "express";
import { generateCertificate } from "./generate-certificate";

export async function startServer(app: Application) {  
    const portNumber: number = 3000;
    const securePortNumber: number = 4300;

    // https only
    app.use((request, response, next) => {
        if (request.secure) {            
            next();
        }
        else {
            const httpsRedirectUrl = `https://${request.headers.host.replace(portNumber, securePortNumber)}${request.path}`;
            response.redirect(301, httpsRedirectUrl);
        }
    });

    // security headers
    app.use((request, response, next) => {
        response.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
        response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
        response.setHeader("X-XSS-Protection", "1; mode=block");
        response.setHeader("X-Frame-Options", "SAMEORIGIN");
        response.setHeader("X-Content-Type-Options", "nosniff");
        next();
    });

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
    
    // serve up index as fallback for SPA
    app.get("*", (request, response) => {
        response.sendFile("/index.html", { root: Path.join(__dirname, "../dist") });
    });

    const sslDetails = await generateCertificate();

    const httpServer = Http.createServer(app);
    const httpsServer = Https.createServer({ key: sslDetails.serviceKey, cert: sslDetails.certificate }, app);
    httpServer.listen(portNumber);
    httpsServer.listen(securePortNumber);
    process.stdout.write("serving at port " + portNumber + " and https at " + securePortNumber);
}