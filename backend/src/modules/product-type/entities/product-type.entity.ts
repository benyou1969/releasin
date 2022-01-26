import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'common/entities/generic.entity';
import { Product } from 'modules/product/entities';
import { Column, Entity, OneToMany, Unique } from 'typeorm';

export enum AttributeType {
  TEXT = 'TEXT',
  BOOLEAN = 'BOOLEAN',
  DATE = 'DATE',
}

@Entity('product-type')
@Unique(['name'])
export class ProductType extends GenericEntity {
  /**
   * Columns
   */
  @ApiProperty()
  @Column()
  name: string;

  @OneToMany((type) => Product, (product) => product.productType, {
    eager: false,
  })
  products: Product[];

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  attributes: Array<{
    name: string;
    type: AttributeType;
  }>;
}
