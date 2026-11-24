const MAX_EMAIL_LENGTH = 254;
const MAX_LOCAL_PART_LENGTH = 64;
const MAX_DOMAIN_LENGTH = 253;
const NOT_FOUND_INDEX = -1;

/**
 * Builds an RFC 5322 compliant email regex using String.raw
 * to satisfy ESLint's `unicorn/prefer-string-raw`, `no-control-regex`, and `max-len` rules.
 */
function buildRfc5322Regex(): RegExp {
  // Standard unquoted local-part characters (atext)
  const atext = "[a-z0-9!#$%&'*+/=?^_`{|}~-]";
  const dotAtom = String.raw`${atext}+(?:\.${atext}+)*`;

  // Quoted-string local-part (allows spaces, @, consecutive dots, and escaped chars)
  const qtext = String.raw`[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]`;
  const quotedPair = String.raw`\\[\x01-\x09\x0b\x0c\x0e-\x7f]`;
  const quotedString = `"(?:${qtext}|${quotedPair})*"`;

  const localPartPattern = `(?:${dotAtom}|${quotedString})`;

  // Domain name labels (no leading/trailing hyphens)
  const domainLabel = '[a-z0-9](?:[a-z0-9-]*[a-z0-9])?';
  const domainName = String.raw`(?:${domainLabel}\.)+${domainLabel}`;

  // IPv4 / IPv6 domain literals (e.g.,)
  const ipv4Octet = '(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])';
  const ipv4Literal = String.raw`(?:${ipv4Octet}\.){3}${ipv4Octet}`;
  const ipv6Literal = String.raw`[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+`;
  const domainLiteral = String.raw`\[(?:${ipv4Literal}|${ipv6Literal})\]`;

  const domainPattern = `(?:${domainName}|${domainLiteral})`;

  return new RegExp(`^${localPartPattern}@${domainPattern}$`, 'i');
}

const RFC_5322_EMAIL_REGEX = buildRfc5322Regex();

/**
 * Implement this function to check if the given string is a valid email address.
 * @param email - The email string to validate.
 * @returns True if valid email, false otherwise.
 */
export function isValidEmail(email: string): boolean {
  if (email.length === 0 || email.length > MAX_EMAIL_LENGTH) {
    return false;
  }

  const atIndex = email.lastIndexOf('@');
  if (atIndex === NOT_FOUND_INDEX) {
    return false;
  }

  const localPart = email.slice(0, atIndex);
  const domainPart = email.slice(atIndex + 1);

  const isLocalValid = localPart.length > 0 && localPart.length <= MAX_LOCAL_PART_LENGTH;
  const isDomainValid = domainPart.length > 0 && domainPart.length <= MAX_DOMAIN_LENGTH;

  if (!isLocalValid || !isDomainValid) {
    return false;
  }

  return RFC_5322_EMAIL_REGEX.test(email);
}

