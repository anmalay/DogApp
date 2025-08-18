// src/shared/config/categories.ts

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "sports",
    name: "Sports & Fitness",
    icon: "fitness-outline",
    color: "bg-blue-500",
    subcategories: [
      { id: "sports-gym", name: "Gym Workouts", categoryId: "sports" },
      { id: "sports-running", name: "Running", categoryId: "sports" },
      { id: "sports-yoga", name: "Yoga", categoryId: "sports" },
      { id: "sports-volleyball", name: "Volleyball", categoryId: "sports" },
      { id: "sports-basketball", name: "Basketball", categoryId: "sports" },
      { id: "sports-football", name: "Football", categoryId: "sports" },
      { id: "sports-tennis", name: "Tennis", categoryId: "sports" },
      { id: "sports-swimming", name: "Swimming", categoryId: "sports" },
    ],
  },
  {
    id: "nature",
    name: "Nature & Outdoors",
    icon: "leaf-outline",
    color: "bg-green-500",
    subcategories: [
      { id: "nature-hiking", name: "Hiking", categoryId: "nature" },
      { id: "nature-cycling", name: "Cycling", categoryId: "nature" },
      { id: "nature-kayaking", name: "Kayaking", categoryId: "nature" },
      { id: "nature-picnic", name: "Picnics", categoryId: "nature" },
      { id: "nature-camping", name: "Camping", categoryId: "nature" },
      { id: "nature-fishing", name: "Fishing", categoryId: "nature" },
      {
        id: "nature-birdwatching",
        name: "Bird Watching",
        categoryId: "nature",
      },
    ],
  },
  {
    id: "culture",
    name: "Culture & Arts",
    icon: "color-palette-outline",
    color: "bg-purple-500",
    subcategories: [
      { id: "culture-exhibition", name: "Exhibitions", categoryId: "culture" },
      { id: "culture-theater", name: "Theater", categoryId: "culture" },
      { id: "culture-museum", name: "Museums", categoryId: "culture" },
      { id: "culture-painting", name: "Painting", categoryId: "culture" },
      { id: "culture-photography", name: "Photography", categoryId: "culture" },
      { id: "culture-crafts", name: "Crafts", categoryId: "culture" },
      { id: "culture-cinema", name: "Cinema", categoryId: "culture" },
    ],
  },
  {
    id: "music",
    name: "Music & Dance",
    icon: "musical-notes-outline",
    color: "bg-pink-500",
    subcategories: [
      { id: "music-concert", name: "Concerts", categoryId: "music" },
      { id: "music-rehearsal", name: "Rehearsals", categoryId: "music" },
      { id: "music-jam", name: "Jam Sessions", categoryId: "music" },
      { id: "music-dance", name: "Dancing", categoryId: "music" },
      { id: "music-karaoke", name: "Karaoke", categoryId: "music" },
      { id: "music-dj", name: "DJ Sessions", categoryId: "music" },
      { id: "music-lessons", name: "Music Lessons", categoryId: "music" },
    ],
  },
  {
    id: "food",
    name: "Food & Culinary",
    icon: "restaurant-outline",
    color: "bg-orange-500",
    subcategories: [
      { id: "food-cooking", name: "Cooking Classes", categoryId: "food" },
      { id: "food-tasting", name: "Tastings", categoryId: "food" },
      { id: "food-restaurant", name: "Restaurant Visits", categoryId: "food" },
      { id: "food-bbq", name: "BBQ", categoryId: "food" },
      { id: "food-wine", name: "Wine Tasting", categoryId: "food" },
      { id: "food-coffee", name: "Coffee Meetups", categoryId: "food" },
      { id: "food-baking", name: "Baking", categoryId: "food" },
    ],
  },
  {
    id: "games",
    name: "Games & Entertainment",
    icon: "game-controller-outline",
    color: "bg-indigo-500",
    subcategories: [
      { id: "games-board", name: "Board Games", categoryId: "games" },
      { id: "games-escape", name: "Escape Rooms", categoryId: "games" },
      { id: "games-video", name: "Video Games", categoryId: "games" },
      { id: "games-cards", name: "Card Games", categoryId: "games" },
      { id: "games-chess", name: "Chess", categoryId: "games" },
      { id: "games-quiz", name: "Quiz Nights", categoryId: "games" },
      { id: "games-roleplay", name: "Role Playing", categoryId: "games" },
    ],
  },
  {
    id: "education",
    name: "Education & Development",
    icon: "school-outline",
    color: "bg-teal-500",
    subcategories: [
      {
        id: "education-language",
        name: "Language Exchange",
        categoryId: "education",
      },
      { id: "education-lecture", name: "Lectures", categoryId: "education" },
      { id: "education-bookclub", name: "Book Clubs", categoryId: "education" },
      { id: "education-workshop", name: "Workshops", categoryId: "education" },
      {
        id: "education-hackathon",
        name: "Hackathons",
        categoryId: "education",
      },
      { id: "education-coding", name: "Coding", categoryId: "education" },
      {
        id: "education-skills",
        name: "Skill Sharing",
        categoryId: "education",
      },
    ],
  },
  {
    id: "wellness",
    name: "Health & Wellness",
    icon: "heart-outline",
    color: "bg-red-500",
    subcategories: [
      { id: "wellness-meditation", name: "Meditation", categoryId: "wellness" },
      {
        id: "wellness-mindfulness",
        name: "Mindfulness",
        categoryId: "wellness",
      },
      { id: "wellness-spa", name: "Spa Days", categoryId: "wellness" },
      { id: "wellness-yoga", name: "Yoga Sessions", categoryId: "wellness" },
      { id: "wellness-massage", name: "Massage", categoryId: "wellness" },
      { id: "wellness-therapy", name: "Group Therapy", categoryId: "wellness" },
    ],
  },
  {
    id: "volunteer",
    name: "Volunteering",
    icon: "people-outline",
    color: "bg-cyan-500",
    subcategories: [
      { id: "volunteer-cleanup", name: "Clean-ups", categoryId: "volunteer" },
      {
        id: "volunteer-shelter",
        name: "Animal Shelters",
        categoryId: "volunteer",
      },
      { id: "volunteer-teaching", name: "Teaching", categoryId: "volunteer" },
      {
        id: "volunteer-charity",
        name: "Charity Events",
        categoryId: "volunteer",
      },
      {
        id: "volunteer-planting",
        name: "Tree Planting",
        categoryId: "volunteer",
      },
      {
        id: "volunteer-elderly",
        name: "Elderly Care",
        categoryId: "volunteer",
      },
      { id: "volunteer-food", name: "Food Banks", categoryId: "volunteer" },
    ],
  },
  {
    id: "family",
    name: "Family & Kids",
    icon: "home-outline",
    color: "bg-yellow-500",
    subcategories: [
      { id: "family-kids", name: "Kids Activities", categoryId: "family" },
      { id: "family-stroller", name: "Stroller Walks", categoryId: "family" },
      {
        id: "family-playground",
        name: "Playground Meetups",
        categoryId: "family",
      },
      { id: "family-crafts", name: "Family Crafts", categoryId: "family" },
      { id: "family-party", name: "Kids Parties", categoryId: "family" },
      {
        id: "family-education",
        name: "Educational Activities",
        categoryId: "family",
      },
      { id: "family-sports", name: "Family Sports", categoryId: "family" },
    ],
  },
  {
    id: "pets",
    name: "Pets & Animals",
    icon: "paw-outline",
    color: "bg-amber-500",
    subcategories: [
      { id: "pets-dogwalk", name: "Dog Walking", categoryId: "pets" },
      { id: "pets-cats", name: "Cat Meetups", categoryId: "pets" },
      { id: "pets-photography", name: "Pet Photography", categoryId: "pets" },
      { id: "pets-training", name: "Pet Training", categoryId: "pets" },
      { id: "pets-playdate", name: "Pet Playdates", categoryId: "pets" },
      { id: "pets-adoption", name: "Adoption Events", categoryId: "pets" },
      { id: "pets-grooming", name: "Grooming Sessions", categoryId: "pets" },
    ],
  },
];

export const getCategoryById = (id: string): Category | undefined => {
  return CATEGORIES.find((cat) => cat.id === id);
};

export const getSubcategoryById = (id: string): Subcategory | undefined => {
  for (const category of CATEGORIES) {
    const subcategory = category.subcategories.find((sub) => sub.id === id);
    if (subcategory) return subcategory;
  }
  return undefined;
};

export const getCategoryBySubcategoryId = (
  subcategoryId: string
): Category | undefined => {
  return CATEGORIES.find((cat) =>
    cat.subcategories.some((sub) => sub.id === subcategoryId)
  );
};
