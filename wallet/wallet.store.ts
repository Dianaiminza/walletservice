import { Wallet } from './entities/wallet.entity';
import { Transaction } from './entities/transaction.entity';

export class WalletStore {
  wallets = new Map<string, Wallet>();
  transactions = new Map<string, Transaction[]>();
  idempotencyKeys = new Set<string>();
}
