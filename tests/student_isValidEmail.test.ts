import { isValidEmail } from '../src/isValidEmail';

describe('isValidEmail', () => {
    test('should return false for an empty string', () => {
        expect(isValidEmail('')).toBe(false);
    });

    test('should return true for simple user.name@domain.us.com style email strings', () => {
        expect(isValidEmail("user@example.com")).toBe(true);
        expect(isValidEmail("as@email.uk.com")).toBe(true);
        expect(isValidEmail("tom.mac.donald@email.uk.com")).toBe(true);
        expect(isValidEmail("a.b.c.d.e.f@g.h.i.j.k.l.m.n.o.p")).toBe(true);
        expect(isValidEmail("this.local.has.64.characters.in.it.10101010101010101001010010101@and.this.domain.has.enough.characters.to.make.the.whole.email.254.characters.long.10101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101101010101010")).toBe(true);
    });

    test(`should return true for emails with !, #, \\, $, %, &, ', *, +, /, =, ?, ^, _, {, |, }, ~, -, in local part`, () => {
        expect(isValidEmail("u!ser@example.com")).toBe(true);
        expect(isValidEmail("u!!s#er@example.com")).toBe(true);
        expect(isValidEmail(`"user\\name"@example.com`)).toBe(true);
        expect(isValidEmail("u$s&e%r^?'*name+/=-~{|}_@example.com")).toBe(true);
        expect(isValidEmail('"double..dots.in.quotes"@example.com')).toBe(true);
    });
    
    test('should return true for valid domain hyphen placement', () => {
        expect(isValidEmail("-user.name@domain.com")).toBe(true);
        expect(isValidEmail("user-.name@domain.com")).toBe(true);
        expect(isValidEmail("user.-name@domain.com")).toBe(true);
        expect(isValidEmail("user-name@domain.com")).toBe(true);
        expect(isValidEmail("user.name-@domain.com")).toBe(true);
        expect(isValidEmail("user.name@this-domain.com")).toBe(true);
    });

    test('should return false for email strings with missing or misplaced . symbols', () => {
        expect(isValidEmail("invalid-email@domain")).toBe(false);
        expect(isValidEmail("my@email..com")).toBe(false);
        expect(isValidEmail("yo.u..r@email.com")).toBe(false);
        expect(isValidEmail(".dotinfront@email.com")).toBe(false);
        expect(isValidEmail("dotatend@email.com.")).toBe(false);
        expect(isValidEmail("dotinmiddle.@email.com")).toBe(false);
    });

    test('should return false for invalid domain hyphen placement', () => {
        expect(isValidEmail("user.name@-domain.com")).toBe(false);
        expect(isValidEmail("user.name@domain-.com")).toBe(false);
        expect(isValidEmail("user.name@domain.-com")).toBe(false);
        expect(isValidEmail("user.name@domain.com-")).toBe(false);
    });

    test('should return false for emails w/ missing or missplaced @ symbol', () => {
        expect(isValidEmail("invalid-email.at.somewhere.com")).toBe(false);
        expect(isValidEmail("myemail!com")).toBe(false);
        expect(isValidEmail("your@@email.com")).toBe(false);
        expect(isValidEmail("your@name@a.b")).toBe(false);
        expect(isValidEmail("@nolocal.onlydomain")).toBe(false);
        expect(isValidEmail("onlylocal@")).toBe(false);
    });
    
    test('should return false for emails with spaces but not for quoted emails', () => {
        expect(isValidEmail("user name@domain.com")).toBe(false);
        expect(isValidEmail('"user name"@domain.com')).toBe(true);
        expect(isValidEmail('username@"domain".com')).toBe(false);
    });

    test('should return false for emails that exceed character limits', () => {
        expect(isValidEmail("12345678912345678912345678912345678912345678912345678912345678900@65inlocal.com")).toBe(false);
        expect(isValidEmail("1@1010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101domainmorethan.253")).toBe(false);
        expect(isValidEmail("1@1010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101.email.more.than.254.characters.in.total")).toBe(false);
    });
});