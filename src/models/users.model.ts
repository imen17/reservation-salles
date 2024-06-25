import { model, Schema, InferRawDocType, SchemaDefinition } from 'mongoose';

const user = {
  email: {
    index: true,
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
} as const satisfies SchemaDefinition;

export type UserDocument = InferRawDocType<typeof user> & { _id: string };

const userModel = model<UserDocument>('User', new Schema(user));
export default userModel;
