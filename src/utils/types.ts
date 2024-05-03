import { DateTime } from "next-auth/providers/kakao";

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

export type PaymentMethods = "PIX" | "CREDIT";

export type PlaceReservationBody = {
  startsAt: DateTime;
  endsAt: DateTime;
  paymentMethod: PaymentMethods;
  numOfInstallments: number;
  eventOwnerId: number;
  productId: number;
  numOfParticipants: number;
  hiredRelatedServicesIds: number[];
};

export type PlaceReservation = {
  id: number;
  startsAt: string;
  endsAt: string;
  paymentMethod: string;
  numOfInstallments: number;
  product: {
    id: number;
    title: string;
    description: string;
    address: string;
    city: string;
    pricePerHour: number;
    owner: {
      id: number;
      name: string;
      profilePhoto: string;
      email: string;
      telephone: string;
      webSite: string;
      userType: string;
    };
    media: [string];
  };
  eventOwner: {
    id: number;
    name: string;
    profilePhoto: string;
    email: string;
    telephone: string;
    webSite: string;
    userType: string;
  };
  status: string;
  numOfParticipants: number;
  hiredRelatedServices: [
    {
      id: number;
      title: string;
      firstMedia: string;
      serviceNature: string;
      pricePerHour: number;
    }
  ];
  placeFinalPrice: number;
  servicesFinalPrice: number;
};

export type AllSpaces = {
  id: number;
  title: string;
  media: string[];
  maximumCapacity: number;
  pricePerHour: number;
  description: string;
}[];
