import { hash } from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from '../dto/users.dto.js';
import { HttpException } from '../exceptions/HttpException.js';
import userModel from '../models/users.model.js';
import { StatusCodes } from 'http-status-codes';

class UserService {
  public users = userModel;

  public async findAllUser() {
    const users = await this.users.find();
    return users;
  }

  public async findUserById(userId: string) {
    const existingUser = await this.users.findOne({ _id: userId });
    if (!existingUser) throw new HttpException(StatusCodes.NOT_FOUND, "User doesn't exist");
    return existingUser;
  }

  public async createUser(userData: CreateUserDto) {
    const existingUser = await this.users.findOne({ email: userData.email });
    if (existingUser) throw new HttpException(StatusCodes.CONFLICT, `This email ${userData.email} already exists`);
    const hashedPassword = await hash(userData.password, 10);
    const createdUser = await this.users.create({ ...userData, password: hashedPassword });
    return createdUser;
  }

  public async updateUser(userId: string, userData: UpdateUserDto) {
    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }
    const existingUser = await this.findUserById(userId);
    existingUser.updateOne(userData);
    const updatedUser = await existingUser.save();
    return updatedUser;
  }

  public async deleteUser(userId: string) {
    await this.users.findByIdAndDelete(userId);
  }
}

export default UserService;
