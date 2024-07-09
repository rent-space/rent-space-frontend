export type ServiceForm = {
  title: string;
  description: string;
  nature: string;
  quantityOfEmployees: number;
  pricePerHour: string;
  images: File[];
  zipCode: number | undefined;
  city: string;
  address: string;
  neighborhood: string;
  complement: string;
};

export type ServicePayload = {
  title: string;
  description: string;
  media: string[];
  address: string;
  neighborhood: string;
  city: string;
  pricePerHour: number;
  ownerId: number;
  serviceNature: string;
  peopleInvolved: number;
  placesIdsRelated: number[];
};

export type Service = {};
