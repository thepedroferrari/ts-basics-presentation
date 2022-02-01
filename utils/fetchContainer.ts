import fetch from "node-fetch";
export interface FetchContainer {
  controller: AbortController;
  url: string;
}

/**
 * @param controller window.AbortController
 * @param url string
 * @description Generates a fetch container for different types of queries.
 * With the added function overloading it makes it strict to the certain possi-
 * bilities and requirements.
 * @fires fetch
 */
export function fetchContainer<T>({
  controller,
  url,
}: FetchContainer): Promise<T> {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    if (response.ok && response.status === 200) {
      const jsonResponse = (await response.json()) as T;
      resolve(jsonResponse);
    } else if (controller.signal.aborted) {
      reject("Connection aborted");
    } else {
      reject(new Error(`Failed to Fetch ${url}`));
    }
  });
}
