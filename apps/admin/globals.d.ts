/* eslint-disable @typescript-eslint/no-empty-object-type */
declare global {
    namespace NodeJS {
        interface ProcessEnv extends CloudflareEnv {}
    }
}

export type {};