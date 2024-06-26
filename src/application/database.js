import { PrismaClient } from "@prisma/client";
import { logger } from "./logging.js"

export const prismaClient = new PrismaClient({
    // setting a log event of client
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ]
});

// sending log from prisma client to winston logging
prismaClient.$on('error', (e) => {
    logger.error(e);
});

prismaClient.$on('warn', (e) => {
    logger.warn(e);
});

prismaClient.$on('info', (e) => {
    logger.warn(e);
});

prismaClient.$on('query', (e) => {
    logger.warn(e);
});