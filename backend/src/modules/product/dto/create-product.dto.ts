import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AttributeType } from 'modules/product-type/entities';

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  productTypeId: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        type: {
          type: 'enum',
        },
        value: {
          type: 'string',
        },
      },
    },
  })
  attributes: Array<{
    name: string;
    type: AttributeType;
    value: string;
  }>;
}
