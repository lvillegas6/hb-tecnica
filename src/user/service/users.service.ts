import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUsertDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';


const saltOrRounds = 10;

@Injectable()
export class UserService {
  
  
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {

  }

  findAll() {
    return this.userRepository.find();
  }


  findBy(email: string){
    return this.userRepository.findOne({
      where: { email }
    });
  }

  async create(payload: CreateUsertDto) {

    const { email, pass } = payload;

    const cacheUser = await this.userRepository.findOne({
          where: { email }
    });

    if(cacheUser){
      throw new ConflictException('User already exists');
    }

    const password = await this.encrypt(pass);

    const createNewUser = {
      ...payload, 
      pass: password,
    }
   
    const newUser = this.userRepository.create(createNewUser);
    this.userRepository.save(newUser);
  }


  async encrypt(text: string){
    const hash = await bcrypt.hash(text, saltOrRounds);
    return hash;
  }

  async compareHash(text: string, hash: string){
    const isMatch = await bcrypt.compare(text, hash);
    return isMatch;
  }


  // async findOne(id: number) {
  //   const product = await this.productRepository.findOne({
  //     where: { id }
  //   });

  //   if (!product) {
  //     throw new NotFoundException(`Product #${id} not found`);
  //   }

  //   return product;
  // }

  // create(payload: CreateProductDto) {
  //   const newProduct = this.productRepository.create(payload);
  //   return this.productRepository.save(newProduct);
  // }

  // async update(id: number, payload: UpdateProductDto) {
  //   const product = await this.productRepository.findOneBy({ id });
  //   this.productRepository.merge(product, payload);
  //   return this.productRepository.save(product);
  // }

  // remove(id: number) {
  //   return this.productRepository.delete(id);
  // }
}
