import * as Http from "http";
import * as Path from "path";
import * as ServeStatic from "serve-static";
import { Application } from "express";

export async function startServer(app: Application) {
    // security headers
    app.use((request, response, next) => {
        response.removeHeader("X-Powered-By");

        // need to confirm this but this should work lovely
        // example of how hash should look noted here -> https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src#Unsafe_inline_styles
        // response.setHeader("Content-Security-Policy", "default-src self style-src {hash-of-loading-styles}");
        response.setHeader("Strict-Transport-Security", "max-age=31536000;");
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

                const mimeType = (ServeStatic.mime as any).lookup(path);
                
                if (mimeType === "text/html") {
                    // don't cache html
                    response.setHeader("Cache-Control", "no-cache");
                }
                else if (/\/(css|javascript)$/.test(mimeType)) {
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

    const httpServer = Http.createServer(app);

    const port = process.env.PORT || 4000;

    httpServer.listen(port);
    process.stdout.write("serving at port " + port);
}