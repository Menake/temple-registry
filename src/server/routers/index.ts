/**
 * This file contains the root router of your tRPC-backend
 */
import superjson from 'superjson';
import { createRouter } from '../createRouter';
import { registerRouter } from './register';

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
    /**
     * Add data transformers
     * @link https://trpc.io/docs/data-transformers
     */
    /**
     * Optionally do custom error (type safe!) formatting
     * @link https://trpc.io/docs/error-formatting
     */
    // .formatError(({ shape, error }) => { })
    .merge('register.', registerRouter);

export type AppRouter = typeof appRouter;