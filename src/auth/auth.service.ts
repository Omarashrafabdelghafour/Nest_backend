import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../schemas/user.shema';
import { userDto } from 'src/Dto/user.dto';
import { faker } from '@faker-js/faker';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: userDto): Promise<{ message: string; error?: string }> {
    try {
      if (!user || !user.password) {
        throw new Error('Invalid user data: password is required');
      }

      user.role = user.role || 'user';

      if (user.email === 'Admin@gmail.com' && user.password === process.env.ADMIN_PASSWORD) {
        user.role = 'Admin';
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser = new this.userModel({
        email: user.email,
        password: hashedPassword,
        username: user.username,
        role: user.role,
      });

      await newUser.save();

      return { message: 'User registered successfully' };
    } catch (error) {
      console.error('Error registering user:', error.message);
      return { message: 'Error registering user', error: error.message };
    }
  }

  async login(user: userDto): Promise<{ message: string; error?: string; access_token?: string }> {
    try {
      if (!user || !user.email || !user.password) {
        throw new Error('Invalid user data: email and password are required');
      }

      console.log('Logging in user:', user);

      const dbUser = await this.userModel.findOne({ email: user.email });

      if (dbUser && await bcrypt.compare(user.password, dbUser.password)) {
        const payload = { username: dbUser.username, sub: dbUser._id, role: dbUser.role };
        return {
          message: 'Login successful',
          access_token: this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRE }),
        };
      }

      return { message: 'Invalid credentials' };
    } catch (error) {
      console.error('Error logging in user:', error.message);
      return { message: 'Error logging in user', error: error.message };
    }
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ _id: id });
  }

  async update(id: string, body: userDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true },
    ).exec();
    
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return updatedUser;
  }    

  async delete(id: string) {
    return await this.userModel.deleteOne({ _id: id });
  }

  async deleteAll() {
    return await this.userModel.deleteMany();
  }

  async search(key: string) {
    const keyword = key
      ? {
          $or: [
            { username: { $regex: key, $options: 'i' } },
            { email: { $regex: key, $options: 'i' } },
          ],
        }
      : {};
    return await this.userModel.find(keyword);
  }

  async faker() {
    for (let index = 0; index < 30; index++) {
      const fakeUser = {
        username: faker.person.fullName(),
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), 10),
      };
      await this.userModel.create(fakeUser);
    }
    return 'success';
  }

}
