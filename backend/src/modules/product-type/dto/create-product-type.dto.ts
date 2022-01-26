import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AttributeType } from '../entities';

export class CreateProductTypeDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

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
      },
    },
  })
  attributes: Array<{
    name: string;
    type: AttributeType;
  }>;
}
