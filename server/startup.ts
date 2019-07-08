import "promise-polyfill/src/polyfill";
import * as Compression from "compression";
import * as Express from "express";
import { startServer } from "./start-server";

// create server
const app: Express.Express = Express();

// setup compression
app.use(Compression());

// listen
startServer(app);

export {
    app as server
};
