import { createCertificate, CertificateCreationResult } from "pem";

export async function generateCertificate() {
    return new Promise<CertificateCreationResult>((resolve, reject) => {
        createCertificate({ selfSigned: true ,altNames: [ "localhost" ] }, (error, result) => {
            if (error) {
                return reject(error);
            }

            resolve(result);
        });
    });
}