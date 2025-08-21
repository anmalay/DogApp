export interface DogProfileData {
  name: string;
  gender: "male" | "female" | "";
  weight: number;
  breed: string;
  birthDate: { day: number; month: number; year: number };
  health: {
    sterilized: boolean;
    vaccinated: boolean;
    parasite_treated: boolean;
  };
  character: {
    activity: "low" | "medium" | "high" | "";
    comfortable_with: {
      big_dogs: boolean;
      small_dogs: boolean;
      same_size: boolean;
      males: boolean;
      females: boolean;
    };
  };
  comment: string;
  photos: string[];
  owner: {
    photo: string | null;
    name: string;
    birth_date: string | null;
  };
}

export interface StepErrors {
  name?: boolean;
  gender?: boolean;
  breed?: boolean;
  ownerName?: boolean;
}