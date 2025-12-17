import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export class CreateWalletDto {
  @ApiProperty({ example: 'Naira' })
  @IsIn(['Naira'])
  currency: 'Naira';
}
