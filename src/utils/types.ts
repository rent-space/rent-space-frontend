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
  title: string;
  description: string;
  address: string;
  city: string;
  pricePerHour: number;
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
