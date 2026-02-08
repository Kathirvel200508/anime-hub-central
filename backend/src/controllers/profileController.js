import { Profile } from '../models/Profile.js';
import { validateProfileInput } from '../validators/profileValidators.js';

export async function getMyProfile(req, res, next) {
  try {
    const profile = await Profile.findOne({ user: req.user.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found.' });
    }

    return res.json({ profile });
  } catch (error) {
    return next(error);
  }
}

export async function upsertMyProfile(req, res, next) {
  try {
    const validationError = validateProfileInput(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const { username, bio = '', favoriteGenres = [], avatarUrl = '' } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.userId },
      {
        username: username.trim(),
        bio,
        favoriteGenres,
        avatarUrl,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.json({ profile });
  } catch (error) {
    return next(error);
  }
}
