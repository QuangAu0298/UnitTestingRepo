import { isValidEmail } from '../src/isValidEmail';

describe('isValidEmail', () => {
    it('should return false for an empty string', () => {
        expect(isValidEmail('')).toBe(false);
    });
});