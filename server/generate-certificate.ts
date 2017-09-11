import { createCertificate, CertificateCreationResult } from "pem";

export async function generateCertificate() {
    return new Promise<CertificateCreationResult>((resolve, reject) => {
        createCertificate((error, result) => {
            if (error) {
                return reject(error);
            }

            resolve(result);
        });
    });
}