import { InferRawDocType, model, Schema, SchemaDefinition, Types } from 'mongoose';

const room = {
  capacity: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  assets: {
    type: {
      projector: { type: Boolean, default: false },
      whiteBoard: { type: Boolean, default: false },
    },
    required: true,
  },
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
} as const satisfies SchemaDefinition;

export type RoomDocument = InferRawDocType<typeof room> & { _id: string };

const roomModel = model<RoomDocument>('Room', new Schema(room));
export default roomModel;

// // Validation to ensure a room cannot be double-booked
// bookingSchema.path('bookingStart').validate(function(value) {
//   // Extract the Room Id from the query object
//   let roomId = this.roomId

//   // Convert booking Date objects into a number value
//   let newBookingStart = value.getTime()
//   let newBookingEnd = this.bookingEnd.getTime()

//   // Function to check for booking clash
//   let clashesWithExisting = (existingBookingStart, existingBookingEnd, newBookingStart, newBookingEnd) => {
//     if (newBookingStart >= existingBookingStart && newBookingStart < existingBookingEnd ||
//       existingBookingStart >= newBookingStart && existingBookingStart < newBookingEnd) {

//       throw new Error(
//         `Booking could not be saved. There is a clash with an existing booking from ${moment(existingBookingStart).format('HH:mm')} to ${moment(existingBookingEnd).format('HH:mm on LL')}`
//       )
//     }
//     return false
//   }

//   // Locate the room document containing the bookings
//   return Room.findById(roomId)
//     .then(room => {
//       // Loop through each existing booking and return false if there is a clash
//       return room.bookings.every(booking => {

//         // Convert existing booking Date objects into number values
//         let existingBookingStart = new Date(booking.bookingStart).getTime()
//         let existingBookingEnd = new Date(booking.bookingEnd).getTime()

//         // Check whether there is a clash between the new booking and the existing booking
//         return !clashesWithExisting(
//           existingBookingStart,
//           existingBookingEnd,
//           newBookingStart,
//           newBookingEnd
//         )
//       })
//     })
// }, `{REASON}`)
