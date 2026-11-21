export class BankAccount {
  private balance = 0;

  getBalance(): number {
    return this.balance;
  }

  deposit(amount: number): void {
    if (!Number.isFinite(amount)) throw new TypeError('Amount must be a finite number');
    if (amount < 0) throw new RangeError('Amount must be non-negative');
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (!Number.isFinite(amount)) throw new TypeError('Amount must be a finite number');
    if (amount < 0) throw new RangeError('Amount must be non-negative');
    if (amount > this.balance) throw new Error('Insufficient funds');
    this.balance -= amount;
  }
}
