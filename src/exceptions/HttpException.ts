import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export class HttpException extends Error {
  public status: number;
  public message: string;
  public errors: { path: string; message: string }[] | undefined;

  constructor(
    status: number = StatusCodes.INTERNAL_SERVER_ERROR,
    message: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    errors: { path: string; message: string }[] | undefined = undefined,
  ) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;
  }
}
