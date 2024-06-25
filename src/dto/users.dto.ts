import { UserDocument } from 'models/users.model';
import { z } from 'zod';

const passwordSchema = z.string().min(1);
const userSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
}).strict() satisfies z.ZodSchema<Omit<UserDocument, '_id'>>;

const createUserSchema = userSchema;
const registerUserSchema = userSchema
  .extend({ passwordConfirm: passwordSchema })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, { message: 'Passwords do not match', path: ['password'] });
const updateUserSchema = userSchema.partial();

export { userSchema, createUserSchema, updateUserSchema, registerUserSchema };
export type CreateUserDto = z.output<typeof createUserSchema>;
export type RegisterUserDto = z.output<typeof registerUserSchema>;
export type UpdateUserDto = z.output<typeof updateUserSchema>;
