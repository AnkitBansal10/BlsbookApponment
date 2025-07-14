// utils/validation.js
export const validators = {
  name: {
    validate: (value) => {
      if (!value.trim()) return 'Name is required';
      if (value.length < 3) return 'Name must be at least 3 characters';
      return '';
    }
  },
  email: {
    validate: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) return 'Email is required';
      if (!emailRegex.test(value)) return 'Invalid email format';
      return '';
    }
  },
  passport: {
    validate: (value) => {
      const passportRegex = /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/i;
      if (!value.trim()) return 'Passport number is required';
      if (!passportRegex.test(value)) return 'Invalid passport format';
      return '';
    }
  }
};