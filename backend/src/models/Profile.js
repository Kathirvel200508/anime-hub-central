import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    bio: {
      type: String,
      default: '',
      maxlength: 300,
    },
    favoriteGenres: {
      type: [String],
      default: [],
    },
    avatarUrl: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export const Profile = mongoose.model('Profile', profileSchema);
