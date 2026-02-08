export function validateProfileInput(data) {
  const { username, bio, favoriteGenres, avatarUrl } = data;

  if (!username || username.trim().length < 3) {
    return 'Username must be at least 3 characters long.';
  }

  if (bio && bio.length > 300) {
    return 'Bio cannot exceed 300 characters.';
  }

  if (favoriteGenres && !Array.isArray(favoriteGenres)) {
    return 'favoriteGenres must be an array of strings.';
  }

  if (avatarUrl && typeof avatarUrl !== 'string') {
    return 'avatarUrl must be a string.';
  }

  return null;
}
