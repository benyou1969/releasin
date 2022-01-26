import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities';
import { ProductRepository } from './repository/product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productRepository.createProduct(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productRepository.findOneOrFail(id).catch((e) => {
      throw new NotFoundException(`Product with id '${id}' was not found`);
    });
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productRepository.updateProduct(id, updateProductDto);
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.productRepository.delete({ id });
    if (result.affected === 1) {
      return { deleted: true };
    } else {
      return { deleted: false };
    }
  }
}
