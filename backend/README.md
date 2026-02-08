# Anime Hub Central Backend (Node.js + Express + MongoDB)

This backend provides:

- User registration
- User login with JWT authentication
- User profile creation/update
- MongoDB storage via Mongoose

## 1) Setup

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` with your MongoDB URI and JWT secret.

## 2) Run

```bash
npm run dev
```

The API runs by default at `http://localhost:5000`.

## 3) API Endpoints

### Health

- `GET /api/health`

### Auth

- `POST /api/auth/register`
  - Body:
    ```json
    {
      "name": "Ash Ketchum",
      "email": "ash@example.com",
      "password": "supersecure123"
    }
    ```
- `POST /api/auth/login`
  - Body:
    ```json
    {
      "email": "ash@example.com",
      "password": "supersecure123"
    }
    ```

### Profile (Bearer token required)

- `GET /api/profile/me`
- `PUT /api/profile/me`
  - Body:
    ```json
    {
      "username": "ashtrainer",
      "bio": "Anime lover",
      "favoriteGenres": ["shonen", "action"],
      "avatarUrl": "https://example.com/avatar.png"
    }
    ```


## 4) Deploy on Vercel

You can deploy this backend as its own Vercel project.

1. Import this repository in Vercel.
2. Set **Root Directory** to `backend`.
3. Add environment variables in Vercel Project Settings:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN` (optional, defaults to `7d`)
   - `CORS_ORIGIN` (set this to your frontend URL)
4. Deploy.

`backend/vercel.json` routes all `/api/*` requests to the serverless function at `api/index.js`.


## 5) If changes are not showing on GitHub

This local environment may not have a Git remote configured.
Check with:

```bash
git remote -v
```

If nothing is listed, add your GitHub repo and push:

```bash
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin work
```

If your default branch is `main`, open a PR from `work` to `main`.

## 6) If Vercel cannot connect to GitHub

If Vercel Git integration fails, deploy manually with Vercel CLI:

```bash
npm i -g vercel
cd backend
vercel login
vercel link
vercel --prod
```

Then set environment variables in Vercel Project Settings:
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CORS_ORIGIN`

This bypasses GitHub integration and still deploys successfully.
