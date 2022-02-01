// Sort an array of objects by an specific key where Array[key] leads to a number.
export function sortNumbersBy<T, K extends keyof T>(
  arr: T[],
  key: K,
  order: "asc" | "dsc" = "asc"
): T[] | undefined {
  // If we try to use this function and pass a key that leads to values other than
  // numeric ones we will end up returning the original array. To avoid confusion
  // that may lead to unwanted bugs we are returning undefined.
  if (typeof arr[0][key] !== "number") return;

  // make a shallow copy of the input array
  const copyOfArray = [...arr]
    // we're using sort which overwrites the array that, good thing we copied it.
    .sort((a: T, b: T) => Number(a[key]) - Number(b[key]));

  // now the copied array is modified by the sort function, so we just need to
  // return it.
  return order === "dsc" ? copyOfArray.reverse() : copyOfArray;
}

// Sort an array of objects by an specific key where Array[key] leads to a string.
export function sortStringsBy<T, K extends keyof T>(
  arr: T[],
  key: K,
  order: "asc" | "dsc" = "asc"
): T[] | undefined {
  // If we try to use this function and pass a key that leads to values other than
  // string ones we will end up returning the original array. To avoid confusion
  // that may lead to unwanted bugs we are returning undefined.
  if (arr.length === 0) return;
  if (typeof arr[0][key] !== "string") return;

  // make a shallow copy of the input array
  const copyOfArray = Array.from(arr).sort((a, b) => {
    const stringA = String(a[key]).toLowerCase();
    const stringB = String(b[key]).toLowerCase();

    if (stringA < stringB) {
      return -1;
    }
    if (stringA > stringB) {
      return 1;
    }
    return 0;
  });

  // now the copied array is modified by the sort function, so we just need to
  // return it.
  return order === "dsc" ? copyOfArray.reverse() : copyOfArray;
}

export function sortBy<T, K extends keyof T>(
  arr: T[],
  key: K,
  order: "asc" | "dsc" = "asc"
) {
  const type = typeof arr[0][key];
  if (type === "number") {
    return sortNumbersBy(arr, key, order);
  }
  if (type === "string") {
    return sortStringsBy(arr, key, order);
  }
  throw new Error("The key provided is not a number or string");
}
