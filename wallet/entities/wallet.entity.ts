export class Wallet {
  constructor(
    public id: string,
    public currency: 'Naira',
    public balance: number = 0,
  ) {}
}
