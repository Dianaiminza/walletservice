import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
} from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { FundWalletDto } from './dto/fund-wallet.dto';
import { TransferWalletDto } from './dto/transfer-wallet.dto';
import { WalletService } from './wallet.service';

@ApiTags('Wallets')
@Controller('wallets')
export class WalletController {
  constructor(private readonly service: WalletService) {}

  @Post()
  @ApiOperation({ summary: 'Create a wallet' })
  create(@Body() dto: CreateWalletDto) {
    return this.service.createWallet(dto.currency);
  }

  @Post(':id/fund')
  @ApiOperation({ summary: 'Fund a wallet' })
  @ApiParam({ name: 'id', description: 'Wallet ID' })
  fund(
    @Param('id') id: string,
    @Body() dto: FundWalletDto,
    @Headers('idempotency-key') key?: string,
  ) {
    this.service.fundWallet(id, dto.amount, key);
    return { status: 'success' };
  }

  @Post('transfer')
  @ApiOperation({ summary: 'Transfer funds between wallets' })
  transfer(@Body() dto: TransferWalletDto) {
    this.service.transfer(
      dto.fromWalletId,
      dto.toWalletId,
      dto.amount,
    );
    return { status: 'success' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get wallet details and transactions' })
  @ApiParam({ name: 'id', description: 'Wallet ID' })
  get(@Param('id') id: string) {
    return this.service.getWalletDetails(id);
  }
}
