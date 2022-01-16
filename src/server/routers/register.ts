import { createRouter } from '@/server/createRouter';
import { z } from 'zod';
import { prisma } from '@/server/utils/prisma'
import { TRPCError } from '@trpc/server';
import { Prisma } from '@prisma/client';

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
            try {
                await prisma.registrant.create({
                    data: {
                        ...input
                    }
                });
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: 'A registrant with that email already exists',
                        cause: error
                    })
                else {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: 'An unknown error occurred, please try again',
                        cause: error
                    })
                }
            }
        },
    })