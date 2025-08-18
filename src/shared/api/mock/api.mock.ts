// src/shared/api/mock/api.mock.ts
import {
  mockExtendedActivities,
  mockUsers,
  mockParticipants,
  ExtendedActivityType,
} from "./activities.mock";
import { User } from "@store/app.store";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API service
export const mockApi = {
  // Auth
  auth: {
    login: async (email: string, password: string) => {
      await delay(1000);

      // Mock validation
      if (!email.includes("@") || password.length < 6) {
        throw new Error("Invalid credentials");
      }

      // Return mock user and token
      const mockUser: User = {
        id: "1",
        email,
        firstName: "John",
        lastName: "Doe",
        about: "Love outdoor activities and meeting new people!",
        avatar: "https://i.pravatar.cc/150?u=john",
        age: 28,
        gender: "male",
        categories: ["sports", "nature", "games"],
        contactMethod: "https://t.me/johndoe",
        country: "USA",
        city: "New York",
      };

      return {
        token: "mock-jwt-token-" + Date.now(),
        user: mockUser,
      };
    },

    register: async (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => {
      await delay(1000);

      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      };

      return {
        token: "mock-jwt-token-" + Date.now(),
        user: newUser,
      };
    },

    googleLogin: async () => {
      await delay(1500);

      const mockUser: User = {
        id: "2",
        email: "google.user@gmail.com",
        firstName: "Google",
        lastName: "User",
        avatar: "https://i.pravatar.cc/150?u=google",
      };

      return {
        token: "mock-jwt-token-google-" + Date.now(),
        user: mockUser,
      };
    },

    telegramLogin: async (telegramData: {
      first_name?: string;
      last_name?: string;
      photo_url?: string;
    }) => {
      await delay(1000);

      const mockUser: User = {
        id: "3",
        email: "telegram@user.com",
        firstName: telegramData?.first_name || "Telegram",
        lastName: telegramData?.last_name || "User",
        avatar:
          telegramData?.photo_url || "https://i.pravatar.cc/150?u=telegram",
      };

      return {
        token: "mock-jwt-token-telegram-" + Date.now(),
        user: mockUser,
      };
    },
  },

  // Activities
  activities: {
    getList: async (params?: {
      page?: number;
      limit?: number;
      categoryId?: string;
      subcategoryId?: string;
      dateFilter?: string;
      city?: string;
      onlyFree?: boolean;
      onlyAvailable?: boolean;
      myActivities?: boolean;
    }) => {
      await delay(800);

      let activities = [...mockExtendedActivities];

      // Apply filters
      if (params?.categoryId) {
        activities = activities.filter(
          (a) => a.categoryId === params.categoryId
        );
      }

      if (params?.subcategoryId) {
        activities = activities.filter(
          (a) => a.subcategoryId === params.subcategoryId
        );
      }

      if (params?.onlyFree) {
        activities = activities.filter((a) => a.price === 0);
      }

      if (params?.onlyAvailable) {
        activities = activities.filter(
          (a) => !a.maxParticipants || a.currentParticipants < a.maxParticipants
        );
      }

      // Pagination
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const start = (page - 1) * limit;
      const end = start + limit;

      return {
        data: activities.slice(start, end),
        total: activities.length,
        page,
        limit,
        hasMore: end < activities.length,
      };
    },

    getById: async (id: string): Promise<ExtendedActivityType | null> => {
      await delay(500);
      return mockExtendedActivities.find((a) => a.id === id) || null;
    },

    create: async (data: Partial<ExtendedActivityType>) => {
      await delay(1000);

      const newActivity: ExtendedActivityType = {
        id: Date.now().toString(),
        title: data.title || "",
        description: data.description || "",
        address: data.address || "",
        maxParticipants: data.maxParticipants || null,
        startDate: data.startDate || new Date().toISOString(),
        endDate: data.endDate || new Date().toISOString(),
        minAge: data.minAge || null,
        maxAge: data.maxAge || null,
        organizerId: "1", // Current user
        price: data.price || 0,
        categoryId: data.categoryId || "sports",
        subcategoryId: data.subcategoryId || "sports-gym",
        requiresApproval: data.requiresApproval || false,
        isRecurring: data.isRecurring || false,
        contactMethod: data.contactMethod || "",
        currentParticipants: 0,
        imageUrl: `https://picsum.photos/seed/${Date.now()}/400/300`,
      };

      mockExtendedActivities.unshift(newActivity);
      return newActivity;
    },

    update: async (id: string, data: Partial<ExtendedActivityType>) => {
      await delay(1000);

      const index = mockExtendedActivities.findIndex((a) => a.id === id);
      if (index !== -1) {
        mockExtendedActivities[index] = {
          ...mockExtendedActivities[index],
          ...data,
        };
        return mockExtendedActivities[index];
      }

      throw new Error("Activity not found");
    },

    delete: async (id: string) => {
      await delay(1000);

      const index = mockExtendedActivities.findIndex((a) => a.id === id);
      if (index !== -1) {
        mockExtendedActivities.splice(index, 1);
        return true;
      }

      throw new Error("Activity not found");
    },

    join: async (activityId: string) => {
      await delay(800);

      const activity = mockExtendedActivities.find((a) => a.id === activityId);
      if (!activity) throw new Error("Activity not found");

      if (
        activity.maxParticipants &&
        activity.currentParticipants >= activity.maxParticipants
      ) {
        throw new Error("Activity is full");
      }

      // Add user to participants
      if (!mockParticipants[activityId]) {
        mockParticipants[activityId] = [];
      }
      mockParticipants[activityId].push("1"); // Current user

      // Update participant count
      activity.currentParticipants += 1;

      return { success: true, requiresApproval: activity.requiresApproval };
    },

    leave: async (activityId: string) => {
      await delay(800);

      const activity = mockExtendedActivities.find((a) => a.id === activityId);
      if (!activity) throw new Error("Activity not found");

      // Remove user from participants
      if (mockParticipants[activityId]) {
        mockParticipants[activityId] = mockParticipants[activityId].filter(
          (id) => id !== "1"
        );
      }

      // Update participant count
      activity.currentParticipants = Math.max(
        0,
        activity.currentParticipants - 1
      );

      return { success: true };
    },
  },

  // User
  user: {
    getProfile: async (userId: string) => {
      await delay(500);

      const mockUser = mockUsers.find((u) => u.id === userId);
      if (!mockUser) throw new Error("User not found");

      return {
        ...mockUser,
        about: "Passionate about outdoor activities and meeting new people!",
        avatar: `https://i.pravatar.cc/150?u=${mockUser.id}`,
        age: 25 + parseInt(mockUser.id),
        gender: parseInt(mockUser.id) % 2 === 0 ? "female" : "male",
        categories: ["sports", "nature"],
        contactMethod: "https://t.me/username",
        country: "USA",
        city: "New York",
      };
    },

    updateProfile: async (data: Partial<User>) => {
      await delay(1000);
      return { ...mockUsers[0], ...data };
    },

    uploadAvatar: async (file: File) => {
      await delay(1500);
      return {
        url: URL.createObjectURL(file),
      };
    },
  },
};
