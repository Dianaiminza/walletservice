import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class TransferWalletDto {
  @ApiProperty()
  @IsString()
  fromWalletId: string;

  @ApiProperty()
  @IsString()
  toWalletId: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsPositive()
  amount: number;
}
