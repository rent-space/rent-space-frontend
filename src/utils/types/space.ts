export type Space = {
  id: number;
  title: string;
  description: string;
  address: string;
  city: string;
  pricePerHour: number;
  media: string[];
  owner: {
    id: number;
    name: string;
    profilePhoto: string;
    email: string;
    telephone: string;
    webSite: string;
  };
  maximumCapacity: number;
  neighborhood: string;
  complement: string;
  zipCode: string;
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

export type AllSpaces = {
  id: number;
  title: string;
  media: string[];
  maximumCapacity: number;
  pricePerHour: number;
  description: string;
}[];
