import { Body, Get, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getLogin() {
    return this.userRepository.find();
  }

  async postSignup(body: SignupDto): Promise<string> {
    try {
      const { password } = body;
      const hash = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({ ...body, password: hash });
      this.userRepository.save(user);
      return 'Utilisateur crée';
    } catch (error) {
      throw new ConflictException('Cet utilisateur existe déja');
    }
  }

  async postLogin(body: LoginDto) {
    const { username, password } = body;
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    if (!user) throw new NotFoundException('User non existant');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Mot de passe invalide');
    return 'Utilisateur connecté';
  }
}
