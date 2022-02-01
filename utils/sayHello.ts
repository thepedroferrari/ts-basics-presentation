import { makeName } from "./makename.js";

export interface User {
  id: string;
  name: {
    first: string;
    last: string;
  };
}

export interface User2 {
  id: string;
  firstName: string;
  lastName: string;
}

export interface User3 {
  id: string;
  name: string;
}

export interface OverloadedUser {
  id: string;
  name?: string | User["name"];
  firstName?: string;
  lastName?: string;
}

export function sayHello(user: User, isFamilyFirst?: boolean): void;
export function sayHello(user: User2, isFamilyFirst?: boolean): void;
export function sayHello(user: User3, isFamilyFirst?: boolean): void;

export function sayHello(user: OverloadedUser, isFamilyFirst: boolean = false) {
  let name: string = "";

  if (typeof user.name === "string") {
    const splitName = user.name.split(" ");
    name = makeName(splitName[0], splitName[1], isFamilyFirst);
  }
  if (typeof user.name === "object" && user.name.first && user.name.last) {
    name = makeName(user.name.first, user.name.last, isFamilyFirst);
  }
  if (typeof user.firstName === "string" && typeof user.lastName === "string") {
    name = makeName(user.firstName, user.lastName, isFamilyFirst);
  }
  console.log(`Hello ${name}`);
}
