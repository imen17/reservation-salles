import { hash, compare } from 'bcrypt';
import { HttpException } from '../exceptions/HttpException.js';
import { sign } from 'jsonwebtoken';
import userModel from '../models/users.model.js';
import type { CreateUserDto, RegisterUserDto } from '../dto/users.dto.js';
import { StatusCodes } from 'http-status-codes';

class AuthService {
  private users = userModel;

  public async register(userData: RegisterUserDto) {
    const existingUser = await this.users.findOne({ email: userData.email });
    if (existingUser) throw new HttpException(StatusCodes.CONFLICT, `This email ${userData.email} already exists`);
    const { email, password } = userData;
    const hashedPassword = await hash(password, 10);
    const createdUser = await this.users.create({ email, password: hashedPassword });
    return createdUser;
  }

  public async login(userData: CreateUserDto) {
    const existingUser = await this.users.findOne({ email: userData.email });
    if (!existingUser) throw new HttpException(StatusCodes.UNAUTHORIZED, `This email ${userData.email} was not found`);

    const isPasswordMatching = await compare(userData.password, existingUser.password);
    if (!isPasswordMatching) throw new HttpException(StatusCodes.UNAUTHORIZED, 'Invalid password');

    const jsonWebToken = this.createToken(existingUser._id);
    return { jsonWebToken, existingUser };
  }

  public createToken(userId: string) {
    const dataStoredInToken = { _id: userId };
    const secretKey = 'secretKey'; // TODO ADD
    const expiresIn = 60 * 60;
    const token = sign(dataStoredInToken, secretKey, { expiresIn });

    return { token, expiresIn };
  }
}

export default AuthService;
