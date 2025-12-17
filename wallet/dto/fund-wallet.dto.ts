import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class FundWalletDto {
  @ApiProperty({ example: 500 })
  @IsNumber()
  @IsPositive()
  amount: number;
}
