export type User = {
  id?: number;
  userType: string;
  name: string;
  profilePhoto: string;
  email: string;
  telephone: string;
  webSite: string;
};

export type Space = {
  id: number;
  title: string;
  description: string;
  address: string;
  city: string;
  pricePerHour: number;
  media: string[];
  owner: {
    name: string;
    profilePhoto: string;
    email: string;
    telephone: string;
    webSite: string;
  };
  maximumCapacity: number;
  neighborhood: string;
  complement: string;
  zipCode: number;
};

export type SpacePayload = {
  title: string;
  description: string;
  media: string[];
  address: string;
  neighborhood: string;
  city: string;
  pricePerHour: number;
  ownerId: number;
  maximumCapacity: number;
  complement: string;
  zipCode: string;
};

export type AllSpaces = { id: number; title: string }[];
