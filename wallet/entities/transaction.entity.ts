export type TransactionType = 'FUND' | 'TRANSFER';

export class Transaction {
  constructor(
    public id: string,
    public walletId: string,
    public type: TransactionType,
    public amount: number,
    public timestamp: Date,
    public metadata?: Record<string, any>,
  ) {}
}
