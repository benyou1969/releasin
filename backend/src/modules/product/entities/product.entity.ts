import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'common/entities/generic.entity';
import { AttributeType, ProductType } from 'modules/product-type/entities';

import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
@Entity('product')
export class Product extends GenericEntity {
  /**
   * Columns
   */
  @ApiProperty()
  @Column()
  name: string;

  @ManyToOne((type) => ProductType, (productType) => productType.products, {
    eager: true,
  })
  @JoinColumn()
  productType: ProductType;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  attributes: Array<{
    name: string;
    type: AttributeType;
    value: string;
  }>;
}
