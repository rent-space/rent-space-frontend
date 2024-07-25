import { DateTime } from "next-auth/providers/kakao";

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
  type: "PLACE";
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

export type ServiceReservationBody = {
  startsAt: DateTime;
  endsAt: DateTime;
  paymentMethod: PaymentMethods;
  numOfInstallments: number;
  productId: number;
  address?: string;
  city?: string;
};

export type ServiceReservation = {
  type: "SERVICE";
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
  finalPrice: number;
  placeFinalPrice: number;
  numOfParticipants: number;
};
