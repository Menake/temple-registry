/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { createRouter } from '@/server/createRouter';
import { z } from 'zod';

export const registerRouter = createRouter()
    // create
    .mutation('add', {
        input: z.object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string().email(),
            phone: z.string().optional()
        }),
        async resolve({ input }) {
            console.log(input)
        },
    })