/**
 * Enterprise Form Validation & Input Sanitization Utilities
 * Enforces:
 * 1. Name fields: Strings/letters only (blocks & validates against numbers)
 * 2. Number fields: Digits only (blocks non-digits)
 * 3. Email fields: Mandatory '@' and standard domain format
 * 4. Custom inline red error messages (no default Chrome popups)
 */

// REGEX PATTERNS
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const STRICT_NAME_REGEX = /^[a-zA-Z\s.'-]+$/;
export const DIGITS_ONLY_REGEX = /^\d+$/;

/**
 * Validates an email address.
 * Strictly requires '@' as requested by the user.
 */
export const validateEmail = (value, label = 'Email', isRequired = true) => {
  const trimmed = (value || '').trim();
  if (!trimmed) {
    return isRequired ? `${label} is required` : null;
  }
  if (!trimmed.includes('@')) {
    return `${label} must contain '@'`;
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return `Enter a valid ${label.toLowerCase()} (e.g. user@domain.com)`;
  }
  return null;
};

/**
 * Validates a name/string field.
 * Strictly blocks and checks against numbers as requested by the user.
 */
export const validateName = (value, label = 'Name', isRequired = true) => {
  const trimmed = (value || '').trim();
  if (!trimmed) {
    return isRequired ? `${label} is required` : null;
  }
  if (/\d/.test(trimmed)) {
    return `${label} must contain letters only (numbers are not allowed)`;
  }
  return null;
};

/**
 * Validates a numeric field (e.g., pincode, count, salary, etc.).
 * Strictly permits only digits.
 */
export const validateNumber = (value, label = 'Field', isRequired = true, minDigits = 1, maxDigits = null) => {
  const str = String(value || '').trim();
  if (!str) {
    return isRequired ? `${label} is required` : null;
  }
  if (!DIGITS_ONLY_REGEX.test(str)) {
    return `${label} must contain numbers only`;
  }
  if (minDigits && str.length < minDigits) {
    return `${label} must be at least ${minDigits} digits`;
  }
  if (maxDigits && str.length > maxDigits) {
    return `${label} cannot exceed ${maxDigits} digits`;
  }
  return null;
};

/**
 * Validates mobile/phone number fields.
 */
export const validatePhone = (value, label = 'Phone Number', isRequired = true) => {
  const trimmed = (value || '').trim();
  if (!trimmed) {
    return isRequired ? `${label} is required` : null;
  }
  const digitsOnly = trimmed.replace(/\D/g, '');
  if (!digitsOnly) {
    return `${label} must contain numbers only`;
  }
  if (digitsOnly.length < 10) {
    return `${label} must be at least 10 digits`;
  }
  if (digitsOnly.length > 15) {
    return `${label} cannot exceed 15 digits`;
  }
  return null;
};

/**
 * Validates general required text.
 */
export const validateRequired = (value, label = 'This field') => {
  if (!value || !String(value).trim()) {
    return `${label} is required`;
  }
  return null;
};

/**
 * INPUT SANITIZERS (Active keystroke enforcement)
 */

// Restricts name input to string characters only (prevents entering numbers)
export const sanitizeNameInput = (value) => {
  if (!value) return '';
  return value.replace(/[0-9]/g, '');
};

// Restricts input to digits only
export const sanitizeNumberInput = (value) => {
  if (!value) return '';
  return value.replace(/\D/g, '');
};

// Allows digits and optional leading plus sign
export const sanitizePhoneInput = (value) => {
  if (!value) return '';
  // Keep + only if it's the very first character
  const hasPlus = value.startsWith('+');
  const digits = value.replace(/\D/g, '');
  return hasPlus ? `+${digits}` : digits;
};

// Restricts input to decimals / amounts
export const sanitizeDecimalInput = (value) => {
  if (!value) return '';
  // Allow only digits and a single dot
  const clean = value.replace(/[^0-9.]/g, '');
  const parts = clean.split('.');
  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('');
  }
  return clean;
};
