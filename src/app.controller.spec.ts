
import { WalletService } from '../wallet/wallet.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// MOCK uuid
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid'),
}));

describe('WalletService', () => {
  let service: WalletService;

  beforeEach(() => {
    service = new WalletService();
  });

  it('should create a wallet', () => {
    const wallet = service.createWallet('Naira');
    expect(wallet.id).toBe('test-uuid'); // predictable
    expect(wallet.currency).toBe('Naira');
    expect(wallet.balance).toBe(0);
  });

  it('should fund a wallet', () => {
    const wallet = service.createWallet('Naira');
    service.fundWallet(wallet.id, 100);
    const details = service.getWalletDetails(wallet.id);
    expect(details.wallet.balance).toBe(100);
    expect(details.transactions?.[0].type).toBe('FUND');
  });

  it('should throw NotFoundException for invalid wallet', () => {
    expect(() => service.fundWallet('invalid-id', 50)).toThrow(NotFoundException);
  });


  it('should throw BadRequestException for insufficient balance', () => {
    const w1 = service.createWallet('Naira');
    const w2 = service.createWallet('Naira');

    service.fundWallet(w1.id, 50);

    expect(() => service.transfer(w1.id, w2.id, 100)).toThrow(BadRequestException);
  });
});
