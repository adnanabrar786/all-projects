import { Prisma } from '@prisma/client';
import { TEvent } from 'utils/types/timeline';

export const PRISMA_COMPUTED_RESULT_EXTENSION = Prisma.defineExtension({
  result: {
    timeline: {
      timeline: {
        needs: { timeline: true },
        compute({ timeline }) {
          return timeline as TEvent[];
        },
      },
    },
  },
});
