import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductType } from './entities';
import { ProductTypeRepository } from './repository';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectRepository(ProductTypeRepository)
    private readonly productTypeRepository: ProductTypeRepository,
  ) {}

  async create(createProductTypeDto: CreateProductTypeDto) {
    return await this.productTypeRepository.createProductType(
      createProductTypeDto,
    );
  }

  async findAll() {
    return await this.productTypeRepository.find();
  }

  async findOne(id: string) {
    return await this.productTypeRepository.findOneOrFail(id).catch((e) => {
      throw new NotFoundException(`Product with id '${id}' was not found`);
    });
  }

  async update(
    id: string,
    updateProductTypeDto: UpdateProductTypeDto,
  ): Promise<ProductType> {
    return await this.productTypeRepository.updateProductType(
      id,
      updateProductTypeDto,
    );
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.productTypeRepository.delete({ id });
    if (result.affected === 1) {
      return { deleted: true };
    } else {
      return { deleted: false };
    }
  }
}
