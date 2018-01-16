import * as Compression from "compression";
import * as Express from "express";
import { startServer } from "./start-server";

// create server
const app = Express();

// setup compression
app.use(Compression());

// listen
startServer(app);
