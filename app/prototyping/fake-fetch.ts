import { wait } from "./wait";

export interface FakeFetchOptions {
    delay?: number;
    httpStatus?: number;
}

export async function fakeFetch(responseBody: string, options?: FakeFetchOptions) {
    await wait(options.delay);

    return {
        json: () => new Promise(resolve => resolve(JSON.parse(responseBody))),
        ok: options.httpStatus < 400,
        status: options.httpStatus,
        text: () => new Promise(resolve => resolve(responseBody))
    } as Response;
}
