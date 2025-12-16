/**
 * Valida formato de email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida senha (mínimo 8 caracteres)
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

/**
 * Valida nickname (apenas letras, números e underscore)
 */
export const isValidNickname = (nickname: string): boolean => {
  const nicknameRegex = /^[a-zA-Z0-9_]+$/;
  return nicknameRegex.test(nickname) && nickname.length >= 3;
};

/**
 * Valida número de camisa (1-99)
 */
export const isValidNumber = (number: string): boolean => {
  const num = parseInt(number);
  return !isNaN(num) && num >= 1 && num <= 99;
};
