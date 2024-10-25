import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dto/products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Product) private productRepository: Repository<Product>,) {
  }

  // private counterId = 1;
  // private products = [
  //   {
  //     id: 1,
  //     name: 'Product 1',
  //     description: 'Description 1',
  //     price: 123,
  //     quantity: 10,
  //   },
  // ];

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id }
    });

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = this.productRepository.create(payload);
    return this.productRepository.save(newProduct);    
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });
    this.productRepository.merge(product, payload);
    return this.productRepository.save(product);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
