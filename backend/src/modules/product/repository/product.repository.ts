import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../dto';
import { Product } from '../entities';
import { v4 as uuid } from 'uuid';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProductType } from 'modules/product-type/entities';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(createProductDto: CreateProductDto) {
    console.log(createProductDto);
    const { name, productTypeId, attributes } = createProductDto;
    const product = new Product();
    const productType = await ProductType.findOneOrFail({
      where: { id: productTypeId },
    }).catch((e) => {
      throw new NotFoundException('Product Type not found');
    });
    product.id = uuid();
    product.name = name;
    product.productType = productType;
    product.attributes = attributes;
    try {
      return await product.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Product Already Exists');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async updateProduct(id: string, updateTagDto: UpdateProductDto) {
    const { name, attributes, productTypeId } = updateTagDto;

    const product = await this.findOneOrFail({ id }).catch((e) => {
      throw new NotFoundException('Product not found');
    });
    const productType = await ProductType.findOneOrFail({
      where: { id: productTypeId },
    }).catch((e) => {
      throw new NotFoundException('Product Type not found');
    });
    product.name = name || product.name;
    product.productType = productType;

    product.attributes = attributes;

    try {
      return await product.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Porduct Already Exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
