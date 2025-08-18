// src/shared/api/mock/activities.mock.ts
import { ActivityDtoType } from "../generated/types";

// Mock users
export const mockUsers = [
  { id: "1", firstName: "John", lastName: "Doe", email: "john@example.com" },
  { id: "2", firstName: "Jane", lastName: "Smith", email: "jane@example.com" },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike@example.com",
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah@example.com",
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Brown",
    email: "david@example.com",
  },
];

// Mock activities
export const mockActivities: ActivityDtoType[] = [
  {
    id: "1",
    title: "Morning Yoga Session",
    description:
      "Join us for a refreshing morning yoga session in the park. All levels welcome!",
    address: "123 Central Park, New York",
    maxParticipants: 15,
    startDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    endDate: new Date(
      Date.now() + 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
    ).toISOString(), // Tomorrow + 2 hours
    minAge: 18,
    maxAge: 65,
    organizerId: "1",
    price: 0,
  },
  {
    id: "2",
    title: "Hiking Adventure",
    description: "Explore beautiful mountain trails with experienced guides.",
    address: "456 Mountain Trail, Colorado",
    maxParticipants: 10,
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    endDate: new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000
    ).toISOString(),
    minAge: 16,
    maxAge: 60,
    organizerId: "2",
    price: 25,
  },
  {
    id: "3",
    title: "Cooking Masterclass",
    description:
      "Learn to cook authentic Italian pasta dishes from a professional chef.",
    address: "789 Culinary School, San Francisco",
    maxParticipants: 8,
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
    endDate: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000
    ).toISOString(),
    minAge: 18,
    maxAge: null,
    organizerId: "3",
    price: 50,
  },
  {
    id: "4",
    title: "Board Game Night",
    description:
      "Bring your favorite board games or try new ones. Snacks provided!",
    address: "321 Game Cafe, Seattle",
    maxParticipants: 20,
    startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    endDate: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000
    ).toISOString(),
    minAge: 16,
    maxAge: null,
    organizerId: "4",
    price: 5,
  },
  {
    id: "5",
    title: "Photography Walk",
    description:
      "Capture the beauty of the city at golden hour. Bring your camera!",
    address: "555 Downtown Plaza, Chicago",
    maxParticipants: 12,
    startDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
    endDate: new Date(
      Date.now() + 4 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000
    ).toISOString(),
    minAge: 14,
    maxAge: null,
    organizerId: "5",
    price: 0,
  },
  {
    id: "6",
    title: "Language Exchange Meetup",
    description:
      "Practice English, Spanish, French, or any language you want to learn!",
    address: "222 Community Center, Boston",
    maxParticipants: 30,
    startDate: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // Today, 6 hours from now
    endDate: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    minAge: 18,
    maxAge: null,
    organizerId: "1",
    price: 0,
  },
  {
    id: "7",
    title: "Beach Volleyball Tournament",
    description:
      "Friendly competition on the beach. Teams will be formed on the spot.",
    address: "888 Beach Blvd, Miami",
    maxParticipants: 24,
    startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    endDate: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000
    ).toISOString(),
    minAge: 16,
    maxAge: 50,
    organizerId: "2",
    price: 10,
  },
  {
    id: "8",
    title: "Art Gallery Opening",
    description:
      "Experience contemporary art and meet local artists. Wine and cheese provided.",
    address: "999 Art District, Los Angeles",
    maxParticipants: 50,
    startDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days from now
    endDate: new Date(
      Date.now() + 8 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000
    ).toISOString(),
    minAge: 21,
    maxAge: null,
    organizerId: "3",
    price: 15,
  },
];

// Mock participants (activity_id -> user_ids)
export const mockParticipants: Record<string, string[]> = {
  "1": ["2", "3", "4"],
  "2": ["1", "5"],
  "3": ["2", "4"],
  "4": ["1", "2", "3", "5"],
  "5": ["3", "4"],
  "6": ["1", "2", "3", "4", "5"],
  "7": ["1", "3"],
  "8": ["2", "4", "5"],
};

// Extended activity type with additional fields
export interface ExtendedActivityType extends ActivityDtoType {
  categoryId: string;
  subcategoryId: string;
  shortDescription?: string;
  requiresApproval: boolean;
  isRecurring: boolean;
  contactMethod: string;
  currentParticipants: number;
  imageUrl?: string;
}

// Mock extended activities with categories
export const mockExtendedActivities: ExtendedActivityType[] =
  mockActivities.map((activity, index) => ({
    ...activity,
    categoryId: [
      "sports",
      "nature",
      "food",
      "games",
      "culture",
      "education",
      "sports",
      "culture",
    ][index],
    subcategoryId: [
      "sports-yoga",
      "nature-hiking",
      "food-cooking",
      "games-board",
      "culture-photography",
      "education-language",
      "sports-volleyball",
      "culture-exhibition",
    ][index],
    shortDescription: activity.description.substring(0, 50) + "...",
    requiresApproval: activity?.price ? activity?.price > 0 : false,
    isRecurring: index % 3 === 0,
    contactMethod: index % 2 === 0 ? "https://t.me/organizer" : "+1234567890",
    currentParticipants: mockParticipants[String(activity.id)]?.length || 0,
    imageUrl: `https://picsum.photos/seed/${activity.id}/400/300`,
  }));
