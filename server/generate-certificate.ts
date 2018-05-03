import { createCertificate, CertificateCreationResult } from "pem";
import { writeFile } from "fs";
import { resolve } from "path";

export async function generateCertificate() {
    return new Promise<CertificateCreationResult>((resolve, reject) => {
        createCertificate({ selfSigned: true, altNames: [ "localhost" ] }, (error, result) => {
            if (error) {
                return reject(error);
            }

            resolve(result);
        });
    });
}
