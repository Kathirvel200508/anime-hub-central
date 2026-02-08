// ============================================
// AniVerse Service Layer
// Mock implementations with future API endpoints commented
// ============================================

import {
  mockFeedPosts,
  mockAnime,
  mockCommunities,
  mockWatchParties,
  mockConversations,
  mockMessages,
  mockUsers,
  mockReviews,
  mockDiscussionThreads,
  allBadges,
  currentUser,
  type FeedPost,
  type Anime,
  type Community,
  type WatchParty,
  type Conversation,
  type Message,
  type User,
  type Review,
  type Badge,
  type DiscussionThread,
} from "@/mocks/data";

// Simulate network delay
const delay = (ms: number = 600) => new Promise((r) => setTimeout(r, ms));

// ============================================
// Feed Service
// ============================================

export const feedService = {
  // TODO: GET /api/feed?filter=:filter&page=:page
  async getFeed(filter?: string): Promise<FeedPost[]> {
    await delay();
    if (filter === "trending") return [...mockFeedPosts].sort((a, b) => b.likes - a.likes);
    return mockFeedPosts;
  },

  // TODO: POST /api/feed/:id/like
  async toggleLike(postId: string): Promise<{ liked: boolean; likes: number }> {
    await delay(200);
    const post = mockFeedPosts.find((p) => p.id === postId);
    if (!post) throw new Error("Post not found");
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
    return { liked: post.isLiked, likes: post.likes };
  },
};

// ============================================
// Anime Service
// ============================================

export const animeService = {
  // TODO: GET /api/anime?search=:query&genre=:genre
  async getAnime(search?: string): Promise<Anime[]> {
    await delay();
    if (search) {
      return mockAnime.filter((a) =>
        a.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    return mockAnime;
  },

  // TODO: GET /api/anime/trending
  async getTrending(): Promise<Anime[]> {
    await delay();
    return [...mockAnime].sort((a, b) => b.rating - a.rating).slice(0, 6);
  },

  // TODO: GET /api/anime/:id
  async getById(id: string): Promise<Anime | undefined> {
    await delay(300);
    return mockAnime.find((a) => a.id === id);
  },
};

// ============================================
// Community Service
// ============================================

export const communityService = {
  // TODO: GET /api/communities
  async getCommunities(): Promise<Community[]> {
    await delay();
    return mockCommunities;
  },

  // TODO: GET /api/communities/:id
  async getById(id: string): Promise<Community | undefined> {
    await delay(300);
    return mockCommunities.find((c) => c.id === id);
  },

  // TODO: POST /api/communities/:id/join
  async join(communityId: string): Promise<{ joined: boolean }> {
    await delay(300);
    return { joined: true };
  },

  // TODO: GET /api/communities/:id/threads
  async getThreads(communityId: string): Promise<DiscussionThread[]> {
    await delay();
    return mockDiscussionThreads;
  },

  // TODO: GET /api/communities/:id/top-reviewers
  async getTopReviewers(communityId: string): Promise<User[]> {
    await delay();
    return mockUsers.slice(1, 5);
  },
};

// ============================================
// Watch Party Service
// ============================================

export const watchPartyService = {
  // TODO: GET /api/watch-parties
  async getParties(): Promise<WatchParty[]> {
    await delay();
    return mockWatchParties;
  },

  // TODO: POST /api/watch-parties/:id/join
  async joinParty(partyId: string): Promise<{ joined: boolean }> {
    await delay(300);
    return { joined: true };
  },

  // TODO: POST /api/watch-parties/:id/remind
  async setReminder(partyId: string): Promise<{ reminded: boolean }> {
    await delay(200);
    return { reminded: true };
  },
};

// ============================================
// Profile Service
// ============================================

export const profileService = {
  // TODO: GET /api/users/:username
  async getProfile(username: string): Promise<User | undefined> {
    await delay();
    return mockUsers.find((u) => u.username === username) || currentUser;
  },

  // TODO: GET /api/users/me
  async getCurrentUser(): Promise<User> {
    await delay(300);
    return currentUser;
  },

  // TODO: PUT /api/users/me
  async updateProfile(data: Partial<User>): Promise<User> {
    await delay(500);
    Object.assign(currentUser, data);
    return currentUser;
  },

  // TODO: POST /api/users/:id/follow
  async toggleFollow(userId: string): Promise<{ following: boolean }> {
    await delay(300);
    return { following: true };
  },
};

// ============================================
// Chat Service
// ============================================

export const chatService = {
  // TODO: GET /api/conversations
  async getConversations(): Promise<Conversation[]> {
    await delay();
    return mockConversations;
  },

  // TODO: GET /api/conversations/:id/messages
  async getMessages(conversationId: string): Promise<Message[]> {
    await delay(300);
    return mockMessages[conversationId] || [];
  },

  // TODO: POST /api/conversations/:id/messages
  async sendMessage(conversationId: string, content: string): Promise<Message> {
    await delay(200);
    const msg: Message = {
      id: `m${Date.now()}`,
      senderId: currentUser.id,
      content,
      timestamp: "Just now",
      isRead: false,
    };
    if (!mockMessages[conversationId]) mockMessages[conversationId] = [];
    mockMessages[conversationId].push(msg);
    return msg;
  },
};

// ============================================
// Review Service
// ============================================

export const reviewService = {
  // TODO: GET /api/reviews?anime=:anime
  async getReviews(anime?: string): Promise<Review[]> {
    await delay();
    if (anime) return mockReviews.filter((r) => r.anime === anime);
    return mockReviews;
  },

  // TODO: POST /api/reviews
  async submitReview(data: { anime: string; rating: number; content: string }): Promise<Review> {
    await delay(500);
    const review: Review = {
      id: `r${Date.now()}`,
      user: currentUser,
      ...data,
      helpfulCount: 0,
      createdAt: "Just now",
    };
    mockReviews.unshift(review);
    return review;
  },
};

// ============================================
// Badge Service
// ============================================

export const badgeService = {
  // TODO: GET /api/badges
  async getBadges(): Promise<Badge[]> {
    await delay();
    return allBadges;
  },

  // TODO: PUT /api/badges/:id/toggle
  async toggleBadge(badgeId: string): Promise<Badge> {
    await delay(200);
    const badge = allBadges.find((b) => b.id === badgeId);
    if (!badge) throw new Error("Badge not found");
    badge.earned = !badge.earned;
    return badge;
  },
};
