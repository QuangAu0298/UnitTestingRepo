import { isPalindrome } from '../src/palindrome';

describe('isPalindrome', () => {
  test('returns true for valid palindromes', () => {
    expect(isPalindrome('racecar')).toBe(true);
    expect(isPalindrome('level')).toBe(true);
  });

  test('returns false for non-palindromes', () => {
    expect(isPalindrome('hello')).toBe(false);
    expect(isPalindrome('world')).toBe(false);
  });

  test('handles edge cases: empty string and single character', () => {
    expect(isPalindrome('')).toBe(true);
    expect(isPalindrome('a')).toBe(true);
  });

  // TODO: Fix the palindrome function to be case-insensitive so this test passes
  test('is case-insensitive', () => {
    expect(isPalindrome('Racecar')).toBe(true);
    expect(isPalindrome('lEVeL')).toBe(true);
  });

  // TODO: Fix the palindrome function to ignore spaces so this test passes
  test('returns true for valid palindromes by ignoring spaces', () => {
    expect(isPalindrome('taco cat')).toBe(true);
  });
});