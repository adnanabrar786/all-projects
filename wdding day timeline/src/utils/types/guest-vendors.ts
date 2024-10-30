import { Category } from '@prisma/client';

export const getGuestVendorType = (types: Category[], categories: number[]) =>
  types
    .filter((i) => categories.includes(i.id))
    .map((i) => i.label)
    .join(', ');
