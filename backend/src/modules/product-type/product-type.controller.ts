import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductType } from './entities';

@Controller('product-type')
@ApiTags('product-type')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) { }

  @Post()
  create(
    @Body() createProductTypeDto: CreateProductTypeDto,
  ): Promise<ProductType> {
    return this.productTypeService.create(createProductTypeDto);
  }

  @Get()
  findAll(): Promise<ProductType[]> {
    return this.productTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductType> {
    return this.productTypeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductTypeDto: UpdateProductTypeDto,
  ): Promise<ProductType> {
    return this.productTypeService.update(id, updateProductTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.productTypeService.remove(id);
  }
}
