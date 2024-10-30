import { PrismaClient } from '@prisma/client';
import { PRISMA_COMPUTED_RESULT_EXTENSION } from './computed_results';

const prisma = new PrismaClient().$extends(PRISMA_COMPUTED_RESULT_EXTENSION);

export default prisma;
