import { EntityRepository, Repository } from 'typeorm';
import { ProductType } from '../entities';
import { v4 as uuid } from 'uuid';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductTypeDto, UpdateProductTypeDto } from '../dto';

@EntityRepository(ProductType)
export class ProductTypeRepository extends Repository<ProductType> {
  async createProductType(createProductTypeDto: CreateProductTypeDto) {
    const { name, attributes } = createProductTypeDto;
    const productType = new ProductType();

    productType.id = uuid();
    productType.name = name;
    productType.attributes = attributes;

    try {
      return await productType.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Product Already Exists');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async updateProductType(
    id: string,
    updateProductTypeDto: UpdateProductTypeDto,
  ) {
    const { name, attributes } = updateProductTypeDto;

    const productType = await this.findOneOrFail({ id }).catch((e) => {
      throw new NotFoundException('Product type not found');
    });

    productType.name = name || productType.name;
    productType.attributes = attributes || productType.attributes;

    try {
      return await productType.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
