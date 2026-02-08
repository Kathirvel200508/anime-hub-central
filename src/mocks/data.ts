// ============================================
// AniVerse Mock Data
// ============================================

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  hoursWatched: number;
  completedAnime: number;
  currentlyWatching: number;
  watchlistCount: number;
  streakDays: number;
  followers: number;
  following: number;
  badges: Badge[];
  isOnline: boolean;
}

export interface Anime {
  id: string;
  title: string;
  coverImage: string;
  genre: string[];
  rating: number;
  episodes: number;
  status: "airing" | "completed" | "upcoming";
  synopsis: string;
  year: number;
}

export interface FeedPost {
  id: string;
  user: User;
  content: string;
  image?: string;
  animeTag?: string;
  isSpoiler: boolean;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  isLiked: boolean;
}

export interface Community {
  id: string;
  name: string;
  coverGradient: string;
  description: string;
  memberCount: number;
  activeNow: number;
  rating: number;
  badge: "rising" | "reviewer-hub" | "elite" | null;
  recentActivity: number;
  icon: string;
}

export interface WatchParty {
  id: string;
  title: string;
  anime: string;
  episode: string;
  hostUser: User;
  startTime: string;
  timezone: string;
  participants: number;
  maxParticipants: number;
  coverGradient: string;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  type: "engagement" | "consistency" | "reviewer" | "taste" | "community";
  description: string;
  earned: boolean;
}

export interface Review {
  id: string;
  user: User;
  anime: string;
  rating: number;
  content: string;
  helpfulCount: number;
  createdAt: string;
}

export interface DiscussionThread {
  id: string;
  user: User;
  title: string;
  content: string;
  replies: number;
  likes: number;
  createdAt: string;
  animeTag?: string;
}

// ============================================
// Mock Users
// ============================================

const avatar = (seed: string) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

export const currentUser: User = {
  id: "u1",
  username: "otaku_sage",
  displayName: "Otaku Sage",
  avatar: avatar("otaku_sage"),
  bio: "Anime connoisseur | 1000+ episodes watched | Shonen enthusiast",
  hoursWatched: 2847,
  completedAnime: 186,
  currentlyWatching: 7,
  watchlistCount: 42,
  streakDays: 23,
  followers: 1284,
  following: 312,
  badges: [],
  isOnline: true,
};

export const mockUsers: User[] = [
  currentUser,
  {
    id: "u2", username: "sakura_blade", displayName: "Sakura Blade",
    avatar: avatar("sakura_blade"), bio: "Romance & Slice of Life lover",
    hoursWatched: 1420, completedAnime: 98, currentlyWatching: 4,
    watchlistCount: 23, streakDays: 15, followers: 856, following: 201,
    badges: [], isOnline: true,
  },
  {
    id: "u3", username: "mecha_king", displayName: "Mecha King",
    avatar: avatar("mecha_king"), bio: "If it has giant robots, I'm watching it",
    hoursWatched: 3100, completedAnime: 220, currentlyWatching: 3,
    watchlistCount: 15, streakDays: 45, followers: 2340, following: 89,
    badges: [], isOnline: false,
  },
  {
    id: "u4", username: "neko_chan", displayName: "Neko Chan",
    avatar: avatar("neko_chan"), bio: "Isekai world traveler ✨",
    hoursWatched: 980, completedAnime: 67, currentlyWatching: 9,
    watchlistCount: 55, streakDays: 8, followers: 445, following: 312,
    badges: [], isOnline: true,
  },
  {
    id: "u5", username: "shadow_hunter", displayName: "Shadow Hunter",
    avatar: avatar("shadow_hunter"), bio: "Seinen & psychological thriller expert",
    hoursWatched: 2100, completedAnime: 145, currentlyWatching: 5,
    watchlistCount: 30, streakDays: 32, followers: 1890, following: 156,
    badges: [], isOnline: false,
  },
  {
    id: "u6", username: "kawaii_desu", displayName: "Kawaii Desu",
    avatar: avatar("kawaii_desu"), bio: "Magical girl anime is peak fiction",
    hoursWatched: 760, completedAnime: 52, currentlyWatching: 6,
    watchlistCount: 38, streakDays: 12, followers: 678, following: 445,
    badges: [], isOnline: true,
  },
];

// ============================================
// Mock Anime
// ============================================

const animeGradients = [
  "from-cyan-600 to-blue-800",
  "from-pink-600 to-purple-800",
  "from-orange-500 to-red-700",
  "from-green-500 to-emerald-800",
  "from-violet-600 to-indigo-900",
  "from-rose-500 to-pink-800",
  "from-amber-500 to-orange-800",
  "from-teal-500 to-cyan-800",
  "from-fuchsia-600 to-purple-900",
  "from-sky-500 to-blue-800",
  "from-lime-500 to-green-800",
  "from-red-500 to-rose-900",
];

export const mockAnime: Anime[] = [
  { id: "a1", title: "Attack on Titan", coverImage: animeGradients[0], genre: ["Action", "Drama"], rating: 9.2, episodes: 87, status: "completed", synopsis: "Humanity fights for survival against giant humanoid Titans.", year: 2013 },
  { id: "a2", title: "Demon Slayer", coverImage: animeGradients[1], genre: ["Action", "Supernatural"], rating: 8.9, episodes: 55, status: "airing", synopsis: "Tanjiro joins the Demon Slayer Corps to save his sister.", year: 2019 },
  { id: "a3", title: "Jujutsu Kaisen", coverImage: animeGradients[2], genre: ["Action", "Supernatural"], rating: 8.8, episodes: 48, status: "airing", synopsis: "Yuji Itadori enters the world of cursed spirits.", year: 2020 },
  { id: "a4", title: "One Piece", coverImage: animeGradients[3], genre: ["Action", "Adventure"], rating: 9.0, episodes: 1100, status: "airing", synopsis: "Monkey D. Luffy sets out to become King of the Pirates.", year: 1999 },
  { id: "a5", title: "Spy x Family", coverImage: animeGradients[4], genre: ["Comedy", "Action"], rating: 8.6, episodes: 37, status: "airing", synopsis: "A spy, assassin, and telepath form a fake family.", year: 2022 },
  { id: "a6", title: "Chainsaw Man", coverImage: animeGradients[5], genre: ["Action", "Horror"], rating: 8.7, episodes: 12, status: "completed", synopsis: "Denji merges with his devil dog to become Chainsaw Man.", year: 2022 },
  { id: "a7", title: "Vinland Saga", coverImage: animeGradients[6], genre: ["Action", "Drama"], rating: 9.1, episodes: 48, status: "completed", synopsis: "A Viking warrior seeks true peace through conflict.", year: 2019 },
  { id: "a8", title: "Frieren", coverImage: animeGradients[7], genre: ["Fantasy", "Adventure"], rating: 9.3, episodes: 28, status: "completed", synopsis: "An elf mage reflects on her journey with fallen heroes.", year: 2023 },
  { id: "a9", title: "Solo Leveling", coverImage: animeGradients[8], genre: ["Action", "Fantasy"], rating: 8.5, episodes: 12, status: "airing", synopsis: "The weakest hunter gains a mysterious power to level up.", year: 2024 },
  { id: "a10", title: "Death Note", coverImage: animeGradients[9], genre: ["Thriller", "Mystery"], rating: 9.0, episodes: 37, status: "completed", synopsis: "A student finds a notebook that kills anyone whose name is written in it.", year: 2006 },
  { id: "a11", title: "My Hero Academia", coverImage: animeGradients[10], genre: ["Action", "Superhero"], rating: 8.4, episodes: 138, status: "completed", synopsis: "In a world of superpowers, a quirkless boy dreams of being a hero.", year: 2016 },
  { id: "a12", title: "Mob Psycho 100", coverImage: animeGradients[11], genre: ["Action", "Comedy"], rating: 8.9, episodes: 37, status: "completed", synopsis: "A powerful psychic tries to live a normal school life.", year: 2016 },
];

// ============================================
// Mock Communities
// ============================================

export const mockCommunities: Community[] = [
  { id: "c1", name: "Shonen Hub", coverGradient: "from-orange-500 to-red-600", description: "The ultimate community for shonen anime fans. Discuss battles, power rankings, and the latest arcs!", memberCount: 45200, activeNow: 1230, rating: 4.8, badge: "elite", recentActivity: 892, icon: "⚔️" },
  { id: "c2", name: "Slice of Life Corner", coverGradient: "from-pink-400 to-rose-500", description: "Relaxing discussions about your favorite comfort anime.", memberCount: 23400, activeNow: 567, rating: 4.6, badge: null, recentActivity: 445, icon: "🌸" },
  { id: "c3", name: "Seinen Society", coverGradient: "from-gray-600 to-slate-800", description: "Deep analysis and mature discussions for seinen enthusiasts.", memberCount: 18900, activeNow: 890, rating: 4.9, badge: "reviewer-hub", recentActivity: 678, icon: "🎭" },
  { id: "c4", name: "Isekai World", coverGradient: "from-purple-500 to-indigo-700", description: "Exploring every parallel world and overpowered protagonist!", memberCount: 34100, activeNow: 1100, rating: 4.3, badge: "rising", recentActivity: 1200, icon: "🌀" },
  { id: "c5", name: "Mecha Alliance", coverGradient: "from-cyan-500 to-blue-700", description: "Giant robots, space battles, and epic mecha moments.", memberCount: 12600, activeNow: 340, rating: 4.7, badge: null, recentActivity: 234, icon: "🤖" },
  { id: "c6", name: "Romance Garden", coverGradient: "from-red-400 to-pink-600", description: "Your heart will flutter! Discuss the best romance anime.", memberCount: 28700, activeNow: 780, rating: 4.5, badge: null, recentActivity: 556, icon: "💕" },
  { id: "c7", name: "Horror Vault", coverGradient: "from-gray-800 to-red-900", description: "Not for the faint of heart. Horror and psychological thrillers.", memberCount: 9800, activeNow: 230, rating: 4.4, badge: "rising", recentActivity: 189, icon: "👻" },
  { id: "c8", name: "Sports Arena", coverGradient: "from-green-500 to-teal-600", description: "From Haikyuu to Blue Lock — all sports anime welcome!", memberCount: 15300, activeNow: 450, rating: 4.6, badge: null, recentActivity: 345, icon: "⚽" },
];

// ============================================
// Mock Feed Posts
// ============================================

export const mockFeedPosts: FeedPost[] = [
  { id: "p1", user: mockUsers[1], content: "Just finished Frieren and I'm absolutely blown away. The way it handles the passage of time and grief is unlike anything I've seen in anime. A true masterpiece! 🌟", animeTag: "Frieren", isSpoiler: false, likes: 234, comments: 45, shares: 12, createdAt: "2h ago", isLiked: false },
  { id: "p2", user: mockUsers[2], content: "The final battle sequence in Attack on Titan was incredible! The way they animated Eren's transformation completely changed the dynamic of the fight.", animeTag: "Attack on Titan", isSpoiler: true, likes: 567, comments: 123, shares: 45, createdAt: "4h ago", isLiked: true },
  { id: "p3", user: mockUsers[3], content: "Starting Spy x Family tonight! Everyone says Anya is the cutest character ever. No spoilers please! 🥜", animeTag: "Spy x Family", isSpoiler: false, likes: 189, comments: 67, shares: 8, createdAt: "5h ago", isLiked: false },
  { id: "p4", user: mockUsers[4], content: "Vinland Saga Season 2 changed my perspective on what anime can be. Thorfinn's character development is the best I've ever seen in any medium.", animeTag: "Vinland Saga", isSpoiler: false, likes: 445, comments: 89, shares: 34, createdAt: "6h ago", isLiked: true },
  { id: "p5", user: mockUsers[5], content: "Anyone else think Jujutsu Kaisen has the best fight choreography in modern anime? Every single battle is a visual spectacle! 🔥", animeTag: "Jujutsu Kaisen", isSpoiler: false, likes: 312, comments: 56, shares: 23, createdAt: "8h ago", isLiked: false },
  { id: "p6", user: mockUsers[1], content: "Hot take: One Piece post-timeskip is better than pre-timeskip. The world-building reaches an entirely different level.", animeTag: "One Piece", isSpoiler: false, likes: 678, comments: 234, shares: 56, createdAt: "10h ago", isLiked: true },
  { id: "p7", user: mockUsers[2], content: "Solo Leveling's animation quality exceeded all my expectations. A-1 Pictures really went all out!", animeTag: "Solo Leveling", isSpoiler: false, likes: 890, comments: 167, shares: 78, createdAt: "12h ago", isLiked: false },
  { id: "p8", user: mockUsers[3], content: "The plot twist in Death Note episode 25 is still one of the greatest moments in anime history. If you know, you know.", animeTag: "Death Note", isSpoiler: true, likes: 1200, comments: 345, shares: 123, createdAt: "1d ago", isLiked: true },
  { id: "p9", user: mockUsers[4], content: "Chainsaw Man's opening sequence is a love letter to cinema. The references are incredible!", animeTag: "Chainsaw Man", isSpoiler: false, likes: 556, comments: 78, shares: 34, createdAt: "1d ago", isLiked: false },
  { id: "p10", user: mockUsers[5], content: "Just hit my 50th completed anime! 🎉 Started with Naruto, latest is Mob Psycho 100. What a journey!", isSpoiler: false, likes: 234, comments: 45, shares: 12, createdAt: "2d ago", isLiked: false },
];

// ============================================
// Mock Watch Parties
// ============================================

export const mockWatchParties: WatchParty[] = [
  { id: "wp1", title: "AoT Finale Rewatch", anime: "Attack on Titan", episode: "S4 E28-30", hostUser: mockUsers[2], startTime: "2026-02-10T20:00:00Z", timezone: "EST", participants: 45, maxParticipants: 100, coverGradient: "from-red-600 to-orange-700" },
  { id: "wp2", title: "Frieren Marathon", anime: "Frieren", episode: "E1-7", hostUser: mockUsers[1], startTime: "2026-02-11T18:00:00Z", timezone: "PST", participants: 32, maxParticipants: 50, coverGradient: "from-teal-500 to-cyan-700" },
  { id: "wp3", title: "JJK Season 2 Watch", anime: "Jujutsu Kaisen", episode: "S2 E1-5", hostUser: mockUsers[4], startTime: "2026-02-12T21:00:00Z", timezone: "EST", participants: 78, maxParticipants: 150, coverGradient: "from-purple-600 to-indigo-800" },
  { id: "wp4", title: "Demon Slayer Night", anime: "Demon Slayer", episode: "S3 E1-4", hostUser: mockUsers[5], startTime: "2026-02-13T19:00:00Z", timezone: "CST", participants: 56, maxParticipants: 80, coverGradient: "from-pink-500 to-red-700" },
  { id: "wp5", title: "One Piece Catch-up", anime: "One Piece", episode: "E1089-1095", hostUser: mockUsers[3], startTime: "2026-02-14T17:00:00Z", timezone: "EST", participants: 23, maxParticipants: 60, coverGradient: "from-green-500 to-emerald-700" },
];

// ============================================
// Mock Conversations & Messages
// ============================================

export const mockConversations: Conversation[] = [
  { id: "conv1", user: mockUsers[1], lastMessage: "Have you seen the latest Frieren episode? 😍", timestamp: "2m ago", unreadCount: 3 },
  { id: "conv2", user: mockUsers[2], lastMessage: "The watch party was so fun last night!", timestamp: "1h ago", unreadCount: 0 },
  { id: "conv3", user: mockUsers[3], lastMessage: "Can you recommend some good isekai?", timestamp: "3h ago", unreadCount: 1 },
  { id: "conv4", user: mockUsers[4], lastMessage: "That review you wrote was amazing 🔥", timestamp: "5h ago", unreadCount: 0 },
  { id: "conv5", user: mockUsers[5], lastMessage: "Let's start a watch party for Chainsaw Man!", timestamp: "1d ago", unreadCount: 0 },
  { id: "conv6", user: { ...mockUsers[2], displayName: "Mecha King" }, lastMessage: "Gundam is the GOAT and I will die on this hill", timestamp: "2d ago", unreadCount: 2 },
];

export const mockMessages: Record<string, Message[]> = {
  conv1: [
    { id: "m1", senderId: "u2", content: "Hey! Have you been keeping up with Frieren?", timestamp: "10m ago", isRead: true },
    { id: "m2", senderId: "u1", content: "Yes! I just finished episode 20. It's incredible!", timestamp: "8m ago", isRead: true },
    { id: "m3", senderId: "u2", content: "Right?! The magic system is so well thought out", timestamp: "5m ago", isRead: true },
    { id: "m4", senderId: "u2", content: "And the character development is chef's kiss 👨‍🍳", timestamp: "4m ago", isRead: false },
    { id: "m5", senderId: "u2", content: "Have you seen the latest Frieren episode? 😍", timestamp: "2m ago", isRead: false },
  ],
  conv2: [
    { id: "m6", senderId: "u3", content: "That AoT watch party was epic!", timestamp: "2h ago", isRead: true },
    { id: "m7", senderId: "u1", content: "I know! The reactions were priceless 😂", timestamp: "1.5h ago", isRead: true },
    { id: "m8", senderId: "u3", content: "The watch party was so fun last night!", timestamp: "1h ago", isRead: true },
  ],
};

// ============================================
// Mock Badges
// ============================================

export const allBadges: Badge[] = [
  { id: "b1", name: "First Steps", icon: "👣", type: "engagement", description: "Watched your first anime", earned: true },
  { id: "b2", name: "Binge Watcher", icon: "🍿", type: "engagement", description: "Watched 10+ episodes in one day", earned: true },
  { id: "b3", name: "Century Club", icon: "💯", type: "engagement", description: "Completed 100 anime", earned: true },
  { id: "b4", name: "Streak Master", icon: "🔥", type: "consistency", description: "Maintained a 30-day streak", earned: false },
  { id: "b5", name: "Daily Devotee", icon: "📅", type: "consistency", description: "Logged in every day for a week", earned: true },
  { id: "b6", name: "Critic's Eye", icon: "🎯", type: "reviewer", description: "Written 10+ reviews", earned: true },
  { id: "b7", name: "Top Reviewer", icon: "⭐", type: "reviewer", description: "Review received 50+ helpful votes", earned: false },
  { id: "b8", name: "Shonen Spirit", icon: "⚔️", type: "taste", description: "Watched 20+ shonen anime", earned: true },
  { id: "b9", name: "Romance Heart", icon: "💕", type: "taste", description: "Watched 15+ romance anime", earned: false },
  { id: "b10", name: "Horror Brave", icon: "👻", type: "taste", description: "Watched 10+ horror anime", earned: true },
  { id: "b11", name: "Community Star", icon: "🌟", type: "community", description: "Active in 5+ communities", earned: true },
  { id: "b12", name: "Party Host", icon: "🎉", type: "community", description: "Hosted a watch party", earned: false },
];

// Assign badges to users
currentUser.badges = allBadges;
mockUsers[0].badges = allBadges;

// ============================================
// Mock Reviews
// ============================================

export const mockReviews: Review[] = [
  { id: "r1", user: mockUsers[4], anime: "Frieren", rating: 10, content: "A meditation on mortality and the meaning of connection. Frieren is not just an anime — it's a philosophical journey that stays with you.", helpfulCount: 89, createdAt: "3d ago" },
  { id: "r2", user: mockUsers[1], anime: "Attack on Titan", rating: 9, content: "One of the most ambitious stories ever told in anime. The ending divided fans but the journey was extraordinary.", helpfulCount: 234, createdAt: "1w ago" },
  { id: "r3", user: mockUsers[2], anime: "Vinland Saga", rating: 10, content: "Season 2 elevated this from a great action anime to a profound exploration of pacifism and redemption.", helpfulCount: 156, createdAt: "2w ago" },
];

// ============================================
// Mock Discussion Threads
// ============================================

export const mockDiscussionThreads: DiscussionThread[] = [
  { id: "dt1", user: mockUsers[1], title: "Best fight scenes in shonen history?", content: "Let's rank the top 10 fight scenes across all shonen anime. My picks...", replies: 87, likes: 234, createdAt: "2h ago", animeTag: "General" },
  { id: "dt2", user: mockUsers[4], title: "Why Seinen deserves more recognition", content: "I feel like seinen anime is massively underrated by the casual audience...", replies: 45, likes: 189, createdAt: "5h ago", animeTag: "Discussion" },
  { id: "dt3", user: mockUsers[2], title: "Power scaling: Who's the strongest?", content: "Goku vs Saitama vs Naruto — let's settle this once and for all!", replies: 234, likes: 567, createdAt: "8h ago", animeTag: "Debate" },
  { id: "dt4", user: mockUsers[3], title: "Hidden gems you've discovered this year", content: "Share your most underrated anime finds! I'll start with...", replies: 56, likes: 123, createdAt: "1d ago" },
];
