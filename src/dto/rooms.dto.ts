import { RoomDocument } from '../models/rooms.model.js';
import { z } from 'zod';

const roomSchema = z
  .object({
    capacity: z.number().positive(),
    assets: z.object({
      projector: z.boolean(),
      whiteBoard: z.boolean(),
    }),
  })
  .strict() satisfies z.ZodSchema<Omit<RoomDocument, '_id' | 'bookings'>>;

const createRoomSchema = roomSchema;
const updateRoomSchema = roomSchema.partial();

export { roomSchema, createRoomSchema, updateRoomSchema };
export type CreateRoomDto = z.output<typeof createRoomSchema>;
export type UpdateRoomDto = z.output<typeof updateRoomSchema>;
