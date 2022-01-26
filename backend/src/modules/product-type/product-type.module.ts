import { Module } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ProductTypeController } from './product-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypeRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTypeRepository])],
  controllers: [ProductTypeController],
  providers: [ProductTypeService],
})
export class ProductTypeModule {}
