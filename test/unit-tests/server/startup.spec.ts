import { Expect, AsyncTest, TestFixture } from "alsatian";
import { server } from "../../../server/startup";
import * as request from "supertest";
import { ServerResponse } from "http";

@TestFixture("server tests")
export class ServerTest {

    @AsyncTest("x-powered-by header removed")
    public async poweredByHeaderRemoved() {
        return new Promise((resolve, reject) => {
            request(server)
                .get("/")
                .expect((response: ServerResponse) => {
                        try {
                        Expect(response.getHeader("Server")).toBe("something");
                        resolve();
                    }
                    catch(e) {
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
