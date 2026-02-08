import { User } from '../models/User.js';
import { Profile } from '../models/Profile.js';
import { comparePassword, hashPassword, signAuthToken } from '../utils/auth.js';
import { env } from '../config/env.js';
import { validateLoginInput, validateRegistrationInput } from '../validators/authValidators.js';

function formatAuthResponse(user) {
  const token = signAuthToken({ userId: user._id.toString(), email: user.email }, env.jwtSecret, env.jwtExpiresIn);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
}

export async function register(req, res, next) {
  try {
    const validationError = validateRegistrationInput(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists.' });
    }

    const passwordHash = await hashPassword(password);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: passwordHash,
    });

    await Profile.create({
      user: user._id,
      username: name.trim().toLowerCase().replace(/\s+/g, ''),
    });

    return res.status(201).json(formatAuthResponse(user));
  } catch (error) {
    return next(error);
  }
}

export async function login(req, res, next) {
  try {
    const validationError = validateLoginInput(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    return res.json(formatAuthResponse(user));
  } catch (error) {
    return next(error);
  }
}
