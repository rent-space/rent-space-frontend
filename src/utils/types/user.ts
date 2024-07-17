export type User = {
  id?: number;
  userType: string;
  name: string;
  profilePhoto: string;
  email: string;
  telephone: string;
  webSite: string;
};

export enum USER_TYPES {
  EVENT_OWNER = "EVENT_OWNER",
  PLACE_OWNER = "PLACE_OWNER",
  SERVICE_OWNER = "SERVICE_OWNER",
}

export type UserType =
  | USER_TYPES.EVENT_OWNER
  | USER_TYPES.PLACE_OWNER
  | USER_TYPES.SERVICE_OWNER;
