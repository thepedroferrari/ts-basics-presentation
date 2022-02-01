export const makeName = (first: string, last: string, isFamilyFirst: boolean) =>
  isFamilyFirst ? `${last} ${first}` : `${first} ${last}`;
