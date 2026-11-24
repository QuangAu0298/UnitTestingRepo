import { isValidEmail } from '../src/isValidEmail';

describe('isValidEmail', () => {
    test('should return false for an empty string', () => {
        expect(isValidEmail('')).toBe(false);
    });

    test('should return true for simple user.name@domain.com style email strings', () => {
        expect(isValidEmail("user@example.com")).toBe(true);
        expect(isValidEmail("as@email.uk.com")).toBe(true);
        expect(isValidEmail("tom.mac.donald@email.uk.com")).toBe(true);
    });

    test("should return true for emails with !, #, \\, $, %, &, ', *, +, /, =, ?, ^, _, {, |, }, ~, -, in local part", () => {
        expect(isValidEmail("u!ser@example.com")).toBe(true);
        expect(isValidEmail("u!!s#er@example.com")).toBe(true);
        expect(isValidEmail('"user\\name"@example.com')).toBe(true);
        expect(isValidEmail("u$s&e%r^?'*name+/=-~{|}_@example.com")).toBe(true);
    });

    test('should return false for email strings with missing or misplaced . symbols', () => {
        expect(isValidEmail("invalid-email@")).toBe(false);
        expect(isValidEmail("my@email..com")).toBe(false);
        expect(isValidEmail("yo.u..r@email.com")).toBe(false);
        expect(isValidEmail(".dotinfront@email.com")).toBe(false);
        expect(isValidEmail("dotatend@email.com.")).toBe(false);
    });

    test('should return false for emails w/ more than 1 or no @ symbol', () => {
        expect(isValidEmail("invalid-email.at.somewhere.com")).toBe(false);
        expect(isValidEmail("myemail!com")).toBe(false);
        expect(isValidEmail("your@@email.com")).toBe(false);
        expect(isValidEmail("your@name@a.b")).toBe(false);
    });
    
});