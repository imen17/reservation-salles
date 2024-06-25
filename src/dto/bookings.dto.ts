import { z } from 'zod';

const bookingSchema = z
  .object({
    bookingStart: z.coerce.date(),
    bookingEnd: z.coerce.date(),
  })
  .strict()
  .refine(
    ({ bookingStart, bookingEnd }) => {
      return bookingEnd.getTime() - bookingStart.getTime() > 0;
    },
    { message: 'Invalid dates', path: ['bookingStart', 'bookingEnd'] },
  );

export { bookingSchema };
export type BookingDTO = z.output<typeof bookingSchema>;
