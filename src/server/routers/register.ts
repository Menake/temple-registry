import { createRouter } from '@/server/createRouter';
import { z } from 'zod';
import { prisma } from '@/server/utils/prisma'

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
            await prisma.registrant.create({
                data: {
                    ...input
                }
            });
        },
    })