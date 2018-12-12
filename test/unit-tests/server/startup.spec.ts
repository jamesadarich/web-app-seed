import { AsyncTest, Expect, TestFixture, Timeout } from "alsatian";
import { ServerResponse } from "http";
import * as request from "supertest";
import { server } from "../../../server/startup";

@TestFixture("server tests")
export class ServerTest {

    @AsyncTest("x-powered-by header removed")
    public async poweredByHeaderRemoved() {
        return new Promise((resolve, reject) => {
            request(server)
                .get("/")
                .set("Accept-Encoding", "identity")
                .end((error, response) => {
                    try {
                        Expect(response.header.server).not.toBeDefined();
                        Expect(response.header.Server).not.toBeDefined();
                        resolve();
                    }
                    catch (e) {
                        reject(e);
                    }
                });
        });
    }

}

// ensure serve static setup correctly

// ensure server uses serve static response

// ensure SPA index served

// ensure server started on port

// ensure console logged with startup info
