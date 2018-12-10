import * as express from "express";
import { startServer } from "./start-server";

// create server
const server = express();

// listen
startServer(server);

export {
    server
};
