import { Request } from 'express';
import { UserDocument } from 'models/users.model';

export interface RequestWithUser extends Request {
  user?: UserDocument;
}
