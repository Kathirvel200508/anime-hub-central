const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegistrationInput(data) {
  const { name, email, password } = data;

  if (!name || name.trim().length < 2) {
    return 'Name must be at least 2 characters long.';
  }

  if (!email || !emailRegex.test(email)) {
    return 'A valid email is required.';
  }

  if (!password || password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  return null;
}

export function validateLoginInput(data) {
  const { email, password } = data;

  if (!email || !emailRegex.test(email)) {
    return 'A valid email is required.';
  }

  if (!password) {
    return 'Password is required.';
  }

  return null;
}
