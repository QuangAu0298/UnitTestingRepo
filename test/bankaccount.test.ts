import { BankAccount } from '../src/bankaccount';

describe('BankAccount', () => {
  test('initial balance is 0', () => {
    const account = new BankAccount();
    expect(account.getBalance()).toBe(0);
  });

  test('deposits increase balance', () => {
    const account = new BankAccount();
    account.deposit(100);
    expect(account.getBalance()).toBe(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('withdrawals decrease balance', () => {
    const account = new BankAccount();
    account.deposit(100);
    account.withdraw(40);
    expect(account.getBalance()).toBe(60);
  });

  test('cannot withdraw more than balance', () => {
    const account = new BankAccount();
    account.deposit(50);
    expect(() => account.withdraw(100)).toThrow('Insufficient funds');
    expect(account.getBalance()).toBe(50);
  });

  test('negative amounts are rejected for deposit and withdraw', () => {
    const account = new BankAccount();
    expect(() => account.deposit(-10)).toThrow(RangeError);
    account.deposit(20);
    expect(() => account.withdraw(-5)).toThrow(RangeError);
    expect(account.getBalance()).toBe(20);
  });

  // TODO: add test for infinite amounts in deposit
  test('infinite amounts are rejected for deposit', () => {
    const account = new BankAccount();
    expect(() => account.deposit(Infinity)).toThrow(TypeError);
    expect(() => account.deposit(-Infinity)).toThrow(TypeError);
    expect(account.getBalance()).toBe(0);
  });

  // TODO: Add test for infinite amounts in withdraw
  test('infinite amounts are rejected for withdraw', () => {
    const account = new BankAccount();
    account.deposit(9999);
    expect(() => account.withdraw(Infinity)).toThrow(TypeError);
    expect(() => account.withdraw(-Infinity)).toThrow(TypeError);
    expect(account.getBalance()).toBe(9999);
  });

});