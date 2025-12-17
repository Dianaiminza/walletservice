import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { WalletStore } from './wallet.store';
import { Wallet } from './entities/wallet.entity';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class WalletService {
  private store = new WalletStore();

  createWallet(currency: 'Naira'): Wallet {
    const wallet = new Wallet(uuid(), currency, 0);
    this.store.wallets.set(wallet.id, wallet);
    this.store.transactions.set(wallet.id, []);
    return wallet;
  }

  fundWallet(walletId: string, amount: number, idempotencyKey?: string) {
    if (idempotencyKey && this.store.idempotencyKeys.has(idempotencyKey)) {
      return;
    }

    const wallet = this.getWallet(walletId);
    wallet.balance += amount;

    this.recordTransaction(walletId, 'FUND', amount);

    if (idempotencyKey) this.store.idempotencyKeys.add(idempotencyKey);
  }

  transfer(fromId: string, toId: string, amount: number) {
    const from = this.getWallet(fromId);
    const to = this.getWallet(toId);

    if (from.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    from.balance -= amount;
    to.balance += amount;

    this.recordTransaction(fromId, 'TRANSFER', -amount, { toId });
    this.recordTransaction(toId, 'TRANSFER', amount, { fromId });
  }

  getWalletDetails(walletId: string) {
    const wallet = this.getWallet(walletId);
    return {
      wallet,
      transactions: this.store.transactions.get(walletId),
    };
  }

  private getWallet(id: string): Wallet {
    const wallet = this.store.wallets.get(id);
    if (!wallet) throw new NotFoundException('Wallet not found');
    return wallet;
  }

  private recordTransaction(
  walletId: string,
  type: 'FUND' | 'TRANSFER',
  amount: number,
  metadata?: any,
) {
  const transactions = this.store.transactions.get(walletId);

  if (!transactions) {
    throw new Error(`Transaction list not found for wallet ${walletId}`);
  }

  transactions.push(
    new Transaction(uuid(), walletId, type, amount, new Date(), metadata),
  );
}

}
