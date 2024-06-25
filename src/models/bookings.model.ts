import { InferRawDocType, Schema, SchemaDefinition, model } from 'mongoose';

const booking = {
  bookingStart: { type: Date },
  bookingEnd: { type: Date },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  roomId: { type: Schema.Types.ObjectId, ref: 'Room' },
} as const satisfies SchemaDefinition;

export type BookingDocument = InferRawDocType<typeof booking> & { _id: string };

const bookingModel = model<BookingDocument>('Booking', new Schema(booking));
export default bookingModel;
